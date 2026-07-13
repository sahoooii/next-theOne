'use server';

import { prisma } from '@/lib/prisma';

import { getAuthUserId } from './authActions';

import { ActionResult } from '@/types';
import { ChatMessage } from '@/types/messages';
import { Conversation } from '@/types/conversations';

import { messageSchema, MessageSchema } from '@/lib/schema/messageSchema';
import {
	mapChatMessageToPayload,
	mapConversationToPayload,
	mapMessageToChatMessage,
	mapMessageToDeletePayload,
} from '@/lib/mappers/messageMapper';
import { pusherServer } from '@/lib/pusher/server';
import { createChatId, createUserChannel } from '@/lib/pusher/channels';
import { messageSelect } from '@/utils/conversations/memberSelect';
import { buildConversation } from '@/utils/conversations/buildConversation';

export async function createMessage(
	recipientUserId: string,
	data: MessageSchema,
): Promise<ActionResult<ChatMessage>> {
	try {
		const userId = await getAuthUserId();

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

		// Chat room
		await pusherServer.trigger(
			createChatId(userId, recipientUserId),
			'message:new',
			chatPayload,
		);

		// Conversation List Sender: userId: conversation partner
		const senderConversationPartner = {
			userId: chatMessage.recipientId!,
			name: chatMessage.recipientName,
			image: chatMessage.recipientImage,
		};

		// Create conversation UI
		const senderConversation: Conversation = {
			userId: senderConversationPartner.userId,
			name: senderConversationPartner.name,
			image: senderConversationPartner.image ?? null,
			lastMessage: chatMessage.text,
			lastMessageSenderId: chatMessage.senderId!,
			created: chatMessage.created,
			dateRead: chatMessage.dateRead,
			hasUnread: false,
		};

		// Covert to Date -> string
		const senderConversationPayload =
			mapConversationToPayload(senderConversation);

		// Conversation list　sender side 通知先
		await pusherServer.trigger(
			createUserChannel(userId),
			'conversation:update',
			senderConversationPayload,
		);

		// Conversation List Recipient: conversation partner
		const recipientConversationPartner = {
			userId: chatMessage.senderId!,
			name: chatMessage.senderName,
			image: chatMessage.senderImage,
		};

		const recipientConversation: Conversation = {
			userId: recipientConversationPartner.userId,
			name: recipientConversationPartner.name,
			image: recipientConversationPartner.image ?? null,
			lastMessage: chatMessage.text,
			lastMessageSenderId: chatMessage.senderId!,
			created: chatMessage.created,
			dateRead: chatMessage.dateRead,
			hasUnread: true,
		};

		// Covert to Date -> string
		const recipientConversationPayload = mapConversationToPayload(
			recipientConversation,
		);

		// Conversation list　recipient side
		// Trigger recipient user's conversation list
		await pusherServer.trigger(
			createUserChannel(recipientUserId),
			'conversation:update',
			recipientConversationPayload,
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

		const payload = mapMessageToDeletePayload(messageId);

		await pusherServer.trigger(chatId, 'message:delete', payload);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
