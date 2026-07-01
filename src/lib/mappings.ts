import { ChatMessage, MessagePayload, MessageWithSenderRecipient } from '@/types';

// Convert Prisma Message to ChatMessage for UI
export function mapMessageToChatMessage(message: MessageWithSenderRecipient) {
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

// string-> Date
// Convert Pusher payload (JSON) to ChatMessage by restoring Date objects
export function mapMessagePayloadToChatMessage(
	message: MessagePayload,
): ChatMessage {
	return {
		...message,
		created: new Date(message.created),
		dateRead: message.dateRead ? new Date(message.dateRead) : null,
	};
}

// Prisma Message
// (created: Date)
//         │
//         ▼
// mapMessageToChatMessage()
//         │
//         ▼
// ChatMessage (UI)
// (created: Date)
//         │
//         ├── Server Action → そのままUIへ
//         │
//         └── Pusher
//               │
//               ▼
//         MessagePayload (JSON)
//         (created: string)
//               │
//               ▼
// mapMessagePayloadToChatMessage()
//               │
//               ▼
// ChatMessage (UI)
// (created: Date)
