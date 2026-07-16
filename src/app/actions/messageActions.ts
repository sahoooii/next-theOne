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
} from '@/lib/mappers/messageMapper';
import { pusherServer } from '@/lib/pusher/server';
import { createChatId } from '@/lib/pusher/channels';
import { notifyConversationUpdate } from '@/lib/pusher/notifyConversationUpdate';

import { messageSelect } from '@/utils/conversations/memberSelect';
import {
	buildConversation,
	getConversation,
} from '@/utils/conversations/buildConversation';

export async function createMessage(
	recipientUserId: string,
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

		// Update DB
		const message = await prisma.message.create({
			data: {
				text,
				recipientId: recipientUserId,
				senderId: userId,
			},
			select: messageSelect,
		});

		// Convert Prisma Message to ChatMessage for UI
		const chatMessage = mapMessageToChatMessage(message);

		// Convert to Date -> string for pusher
		const chatPayload = mapChatMessageToPayload(chatMessage);

		// Update: Chat room
		await pusherServer.trigger(
			createChatId(userId, recipientUserId),
			'message:new',
			chatPayload,
		);

		// Messageの一覧取得(Conversationを作るためにチャット全体を取得)
		const messages = await prisma.message.findMany({
			where: {
				OR: [
					{
						senderId: userId,
						recipientId: recipientUserId,
					},
					{
						senderId: recipientUserId,
						recipientId: userId,
					},
				],
			},
			orderBy: {
				created: 'desc',
			},
			select: messageSelect,
		});

		// Conversation取得
		const senderUserConversation = getConversation(
			messages,
			userId,
			recipientUserId,
		);

		const recipientUserConversation = getConversation(
			messages,
			recipientUserId,
			userId,
		);

		// ConversationList更新
		await notifyConversationUpdate(
			userId,
			recipientUserId,
			senderUserConversation,
		);

		await notifyConversationUpdate(
			recipientUserId,
			userId,
			recipientUserConversation,
		);

		return { status: 'success', data: chatMessage };
	} catch (error) {
		console.log(error);

		return { status: 'error', error: 'Something went wrong' };
	}
}

// 自分 と 相手 の会話一覧を取得
export async function getMessageThread(recipientId: string) {
	try {
		const userId = await getAuthUserId();

		const messages = await prisma.message.findMany({
			where: {
				OR: [
					{
						senderId: userId,
						recipientId,
					},
					{
						senderId: recipientId,
						recipientId: userId,
					},
				],
			},
			orderBy: {
				created: 'asc',
			},
			select: messageSelect,
		});

		// Add Date at date Read, when open up chat conversation
		const currentUserId = userId;
		const otherUserId = recipientId;

		await prisma.message.updateMany({
			where: {
				senderId: otherUserId,
				recipientId: currentUserId,
				dateRead: null,
			},
			data: { dateRead: new Date() },
		});

		return messages.map((message) => mapMessageToChatMessage(message));
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// ① Get all conversations(全メッセージ取得)
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
		const messages = await prisma.message.findMany({
			where: {
				OR: [
					{
						senderId: message.senderId,
						recipientId: message.recipientId,
					},
					{
						senderId: message.recipientId,
						recipientId: message.senderId,
					},
				],
			},
			orderBy: {
				created: 'desc',
			},
			select: messageSelect,
		});

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

		// Sender side
		await notifyConversationUpdate(
			message.senderId,
			message.recipientId,
			senderConversation,
		);

		// Recipient side
		await notifyConversationUpdate(
			message.recipientId,
			message.senderId,
			recipientConversation,
		);

		// For Chat room
		const chatRoomPayload = mapMessageToDeletePayload(messageId);

		await pusherServer.trigger(chatId, 'message:delete', chatRoomPayload);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
