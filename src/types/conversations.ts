/**
 * Conversation domain types.(conversationList = Messages page)
 *
 * Includes:
 * - Conversation UI models
 * - Realtime payloads for ConversationList synchronization
 */

// UI Model
export type Conversation = {
	userId: string; //userId here means "conversation partner", not the channel owner.
	name: string;
	image: string | null;
	lastMessage: string;
	lastMessageSenderId: string;
	created: Date;
	dateRead: Date | null;
	unreadCount: number; //Manage unread message
};

// 通信で更新したいもの pusher
export type ConversationPayload = {
	userId: string;
	name: string;
	image: string | null;
	lastMessage: string;
	lastMessageSenderId: string;
	created: string;
	dateRead: string | null;
	hasUnread: boolean;
};

// Conversationがゼロになったとき（最後の会話が消された時）
export type ConversationDeletePayload = {
	userId: string;
};
