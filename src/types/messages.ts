/**
 * Message domain types.(For chat room aka members/[userId]/chat)
 *
 * Includes:
 * - UI models (ChatMessage)
 * - Realtime payloads (MessagePayload, MessageDeletePayload)
 */

// UI Model
export type ChatMessage = {
	id: string;
	text: string;
	created: Date;
	dateRead: Date | null;
	senderId: string | null;
	senderName: string;
	senderImage?: string | null;
	recipientId: string | null;
	recipientName: string;
	recipientImage?: string | null;
};

// For pusher Date -> string
// Pusherを流れる通信データ(JSON)の型
export type MessagePayload = {
	id: string;
	text: string;
	created: string;
	dateRead: string | null;
	senderId: string | null;
	senderName: string;
	senderImage?: string | null;
	recipientId: string | null;
	recipientName: string;
	recipientImage?: string | null;
};

export type MessageDeletePayload = {
	messageId: string;
};
