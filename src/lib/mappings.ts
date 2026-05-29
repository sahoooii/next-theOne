import { MessageWithSenderRecipient } from '@/types';

export function mapMessageToMessageDto(message: MessageWithSenderRecipient) {
	return {
		id: message.id,
		text: message.text,
		created: message.created,
		dateRead: message.dateRead ? message.dateRead : null,
		senderId: message.sender?.userId ?? null,
		senderName: message.sender?.name ?? 'Deleted user',
		senderImage: message.sender?.image,
		recipientId: message.recipient?.userId ?? null,
		recipientName: message.recipient?.name ?? 'Deleted user',
		recipientImage: message.recipient?.image,
	};
}
