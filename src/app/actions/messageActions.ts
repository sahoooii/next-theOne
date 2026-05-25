'use server';

import { prisma } from '@/lib/prisma';
import { Message } from '@prisma/client';
import { ActionResult } from '@/types';
import { getAuthUserId } from './authActions';
import { messageSchema, MessageSchema } from '@/lib/schema/messageSchema';

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
