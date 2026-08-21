import { pusherServer } from '../server';
import { createChatChannel } from '../channels';
import { mapReadReceiptToPayload } from '@/utils/conversations/mappers/messageMapper';

export async function notifyReadReceipt(
	chatId: string,
	readerId: string,
	readAt: Date,
) {
	const payload = mapReadReceiptToPayload({
		chatId,
		readerId,
		readAt,
	});

	const channel = createChatChannel(chatId);

	await pusherServer.trigger(channel, 'message:read', payload);
}
