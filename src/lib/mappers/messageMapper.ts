import { Conversation, ConversationPayload } from '@/types/conversations';
import {
	ChatMessage,
	MessageDeletePayload,
	MessagePayload,
} from '@/types/messages';
import { MessageWithSenderRecipient } from '@/types/prisma';

// Chat room: Convert Prisma Message to ChatMessage for UI
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

// Chat room: UIで使うDate型を、通信できるJSON型へ変換するMapper
export function mapChatMessageToPayload(message: ChatMessage): MessagePayload {
	return {
		...message,
		created: message.created.toISOString(),
		dateRead: message.dateRead ? message.dateRead.toISOString() : null,
	};
}

// Chat room: string-> Date
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

// For delete message at Chat room
export function mapMessageToDeletePayload(
	messageId: string,
): MessageDeletePayload {
	return { messageId };
}

// Conversation list: Date -> string
// Convert Date objects to string for Pusher payload (JSON)
export function mapConversationToPayload(
	conversation: Conversation,
): ConversationPayload {
	return {
		...conversation,
		created: conversation.created.toISOString(),
		dateRead: conversation.dateRead
			? conversation.dateRead.toISOString()
			: null,
	};
}

// Conversation list: string(通信)-> Date(UI)
export function mapConversationPayloadToConversation(
	conversation: ConversationPayload,
): Conversation {
	return {
		...conversation,
		created: new Date(conversation.created),
		dateRead: conversation.dateRead ? new Date(conversation.dateRead) : null,
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
