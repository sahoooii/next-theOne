import { prisma } from '@/lib/prisma';

// Update dateRead: Add Date at date Read, when open up chat conversation
export async function markMessagesAsRead(
	userId: string,
	partnerUserId: string,
): Promise<Date> {
	const readAt = new Date();

	await prisma.message.updateMany({
		where: {
			senderId: partnerUserId,
			recipientId: userId,
			dateRead: null,
		},
		data: {
			dateRead: readAt,
		},
	});

	return readAt;
}
