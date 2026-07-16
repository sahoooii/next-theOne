import { prisma } from '@/lib/prisma';
import { messageSelect } from './messageQuery';

// User2人のチャット履歴の取得
export async function getConversationMessages(
	userId: string,
	partnerUserId: string,
	order: 'asc' | 'desc' = 'desc',
) {
	return prisma.message.findMany({
		where: {
			OR: [
				{
					senderId: userId,
					recipientId: partnerUserId,
				},
				{
					senderId: partnerUserId,
					recipientId: userId,
				},
			],
		},
		orderBy: {
			created: order,
		},
		select: messageSelect,
	});
}
