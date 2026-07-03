'use server';

import { prisma } from '@/lib/prisma';
import { ActionResult, ChatMessage, ConversationDto } from '@/types';
import { getAuthUserId } from './authActions';
import { messageSchema, MessageSchema } from '@/lib/schema/messageSchema';
import { mapChatMessageToPayload, mapMessageToChatMessage } from '@/lib/mappings';
import { pusherServer } from '@/lib/pusher/server';
import { createChatId } from '@/lib/utils';

const messageSelect = {
	id: true,
	text: true,
	created: true,
	dateRead: true,
	sender: {
		select: {
			userId: true,
			name: true,
			image: true,
		},
	},
	recipient: {
		select: {
			userId: true,
			name: true,
			image: true,
		},
	},
};

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
		const payload = mapChatMessageToPayload(chatMessage);

		await pusherServer.trigger(
			createChatId(userId, recipientUserId),
			'message:new',
			payload,
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

// ① Get all conversation(全メッセージ取得)s② Convert to list of conversation(会話一覧に変換)③ Get unread message info and add these(未読情報を付与)
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

		// Map: Prevent set duplicate user
		// ex: Hannah,Hannah,Hannah,Amanda,Amanda→Hannah,Amanda
		const conversationMap = new Map<string, ConversationDto>();

		const unreadUsers = new Set<string>();

		for (const message of messages) {
			// nullの制御
			if (!message.sender || !message.recipient) continue;

			// Get conversation partner(会話相手の取得)
			const otherUser =
				message.sender.userId === userId ? message.recipient : message.sender;

			// Record user of unread(未読メッセージの記録)
			if (
				message.sender.userId === otherUser.userId &&
				message.recipient.userId === userId &&
				message.dateRead === null
			) {
				unreadUsers.add(otherUser.userId);
			}

			// 最新メッセージからConversation生成
			// has=同じユーザーを1回だけ登録 set=未読ユーザーを重複なく記録するため
			if (!conversationMap.has(otherUser.userId)) {
				conversationMap.set(otherUser.userId, {
					userId: otherUser.userId,
					name: otherUser.name,
					image: otherUser.image,
					lastMessage: message.text,
					created: message.created,
					dateRead: message.dateRead,
					hasUnread: false, //Add later
				});
			}
		}

		// 配列に戻す
		return Array.from(conversationMap.values()).map((conversation) => ({
			...conversation,
			hasUnread: unreadUsers.has(conversation.userId),
		}));
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function deleteMessage(messageId: string) {
	try {
		const userId = await getAuthUserId();

		await prisma.message.deleteMany({
			where: {
				id: messageId,
				senderId: userId,
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}
