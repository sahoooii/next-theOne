'use server';

import { prisma } from '@/lib/prisma';

import { getAuthUserId } from './authActions';

import { ActionResult } from '@/types';
import { ChatMessage } from '@/types/messages';

import { messageSchema, MessageSchema } from '@/lib/schema/messageSchema';
import {
	mapChatMessageToPayload,
	mapMessageToChatMessage,
	mapMessageToDeletePayload,
} from '@/utils/conversations/mappers/messageMapper';
import { pusherServer } from '@/lib/pusher/server';
import { createChatChannel, createChatId } from '@/lib/pusher/channels';
import { notifyConversationUpdate } from '@/lib/pusher/notifyConversationUpdate';

import { messageSelect } from '@/utils/conversations/messageQuery';
import {
	buildConversation,
	getConversation,
} from '@/utils/conversations/buildConversation';
import { getConversationMessages } from '@/utils/conversations/getConversationMessages';
import { markMessagesAsRead } from '@/utils/conversations/markMessageAsRead';
import { notifyReadReceipt } from '@/lib/pusher/notifyReadReceipt';

// Chat room: Create a new message
export async function createMessage(
	recipientId: string,
	data: MessageSchema,
): Promise<ActionResult<ChatMessage>> {
	try {
		const userId = await getAuthUserId();

		// Validation
		const validated = messageSchema.safeParse(data);

		if (!validated.success) {
			const fieldErrors = validated.error.issues.reduce(
				(acc, issue) => {
					const field = issue.path[0] as string;
					acc[field] = issue.message;
					return acc;
				},
				{} as Record<string, string>,
			);
			return { status: 'error', error: fieldErrors };
		}
		const { text } = validated.data;

		// Update DB: create a new message
		const message = await prisma.message.create({
			data: {
				text,
				recipientId: recipientId,
				senderId: userId,
			},
			select: messageSelect,
		});

		// Convert Prisma Message to ChatMessage for UI
		const chatMessage = mapMessageToChatMessage(message);

		// Convert to Date -> string for pusher
		const chatPayload = mapChatMessageToPayload(chatMessage);

		const chatId = createChatId(userId, recipientId);

		// Update: Chat room
		await pusherServer.trigger(
			createChatChannel(chatId),
			'message:new',
			chatPayload,
		);

		// Messageの一覧取得(Conversationを作るためにチャット全体を取得)
		const messages = await getConversationMessages(userId, recipientId);

		// Conversation取得
		const senderUserConversation = getConversation(
			messages,
			userId,
			recipientId,
		);

		const recipientUserConversation = getConversation(
			messages,
			recipientId,
			userId,
		);

		// Update: ConversationList: currentUser side
		await notifyConversationUpdate(userId, recipientId, senderUserConversation);

		// Update: ConversationList: conversation partner side
		await notifyConversationUpdate(
			recipientId,
			userId,
			recipientUserConversation,
		);

		return { status: 'success', data: chatMessage };
	} catch (error) {
		console.log(error);

		return { status: 'error', error: 'Something went wrong' };
	}
}

// Chat room: 自分 と 相手 の会話一覧を取得
export async function getMessageThread(recipientId: string) {
	try {
		const userId = await getAuthUserId();
		const chatId = createChatId(userId, recipientId);

		// Update: dateRead(DB)
		const readAt = await markMessagesAsRead(userId, recipientId);

		// Chat room: Get latest chat room history(display: 'asc')
		const messages = await getConversationMessages(userId, recipientId, 'asc');

		// Chat room: notification(ChatRoomへ message:read を送信)
		await notifyReadReceipt(chatId, userId, readAt);

		// For conversation: Conversation生成用（desc）(最新のMessage取得)
		const conversationMessages = await getConversationMessages(
			userId,
			recipientId,
			'desc',
		);

		// Conversationを1件作る
		// Sender side
		const senderConversation = getConversation(
			conversationMessages,
			userId,
			recipientId,
		);

		// Recipient side
		const recipientConversation = getConversation(
			conversationMessages,
			recipientId,
			userId,
		);

		// ConversationList: update
		// Sender side
		await notifyConversationUpdate(userId, recipientId, senderConversation);

		// Recipient side
		await notifyConversationUpdate(recipientId, userId, recipientConversation);

		// Convert to ChatMessage
		return messages.map((message) => mapMessageToChatMessage(message));
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Conversation list:  Get all conversations(全メッセージ取得)
export async function getConversationsList() {
	try {
		const userId = await getAuthUserId();

		// ① 自分が送信、受信したメッセージのリストを最新順に取得
		const messages = await prisma.message.findMany({
			where: {
				OR: [{ senderId: userId }, { recipientId: userId }],
			},
			orderBy: {
				created: 'desc',
			},
			select: messageSelect,
		});

		return buildConversation(messages, userId);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Chatroom & Conversation list: delete
export async function deleteMessage(messageId: string) {
	try {
		const userId = await getAuthUserId();

		// 削除された1件のメッセージ
		const message = await prisma.message.findUnique({
			where: {
				id: messageId,
			},
		});

		if (!message) throw new Error('Message not found');

		if (message.senderId !== userId) throw new Error('Unauthorized');

		if (!message.senderId || !message.recipientId) {
			throw new Error('Invalid message');
		}

		const chatId = createChatId(message.senderId, message.recipientId);

		await prisma.message.delete({
			where: {
				id: messageId,
			},
		});

		// 削除されたメッセージから、このチャットの参加者（送信者・受信者）を特定し、その2人の会話履歴だけを取得する
		const messages = await getConversationMessages(
			message.senderId,
			message.recipientId,
		);

		// Sender side
		const senderConversation = getConversation(
			messages,
			message.senderId,
			message.recipientId,
		);

		// Recipient side
		const recipientConversation = getConversation(
			messages,
			message.recipientId,
			message.senderId,
		);

		// Conversation list: Sender side
		await notifyConversationUpdate(
			message.senderId,
			message.recipientId,
			senderConversation,
		);

		// Conversation list: Recipient side
		await notifyConversationUpdate(
			message.recipientId,
			message.senderId,
			recipientConversation,
		);

		// Chat room
		const chatRoomPayload = mapMessageToDeletePayload(messageId);

		// Chat room: delete
		await pusherServer.trigger(
			createChatChannel(chatId),
			'message:delete',
			chatRoomPayload,
		);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
