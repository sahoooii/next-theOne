'use server';

import { prisma } from '@/lib/prisma';
import { Message } from '@prisma/client';
import { ActionResult, ConversationDto } from '@/types';
import { getAuthUserId } from './authActions';
import { messageSchema, MessageSchema } from '@/lib/schema/messageSchema';
import { mapMessageToMessageDto } from '@/lib/mappings';

export async function createMessage(
	recipientUserId: string,
	data: MessageSchema,
): Promise<ActionResult<Message>> {
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
		});
		return { status: 'success', data: message };
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
			select: {
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
			},
		});

		return messages.map((message) => mapMessageToMessageDto(message));
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getConversationsList() {
	try {
		const userId = await getAuthUserId();

		// 自分が送信、受信したメッセージのリストを最新順に取得
		const messages = await prisma.message.findMany({
			where: {
				OR: [{ senderId: userId }, { recipientId: userId }],
			},
			orderBy: {
				created: 'desc',
			},
			select: {
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
			},
		});

		// 会話相手の取得
		const conversationMap = new Map<string, ConversationDto>();

		for (const message of messages) {
			// nullの制御
			if (!message.sender || !message.recipient) continue;

			const otherUser =
				message.sender.userId === userId ? message.recipient : message.sender;

			if (!conversationMap.has(otherUser.userId)) {
				conversationMap.set(otherUser.userId, {
					userId: otherUser.userId,
					name: otherUser.name,
					image: otherUser.image,
					lastMessage: message.text,
					created: message.created,
					dateRead: message.dateRead,
				});
			}
		}
		return Array.from(conversationMap.values());
	} catch (error) {
		console.log(error);
		throw error;
	}
}
