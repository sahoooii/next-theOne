// TODO:
// Refactor buildConversation() to be order-independent.
// Currently assumes messages are sorted in descending order.

import { Conversation } from '@/types/conversations';
import { ConversationMessage } from '@/types/prisma';

// Message[] → Conversation[]
//  Message一覧からConversation一覧を組み立てるためのアルゴリズム
export function buildConversation(
	messages: ConversationMessage[],
	userId: string,
) {
	// ② Convert to list of conversation(会話一覧に変換)
	// Map: Prevent set duplicate user
	// ex: Hannah,Hannah,Hannah,Amanda,Amanda→Hannah,Amanda
	const conversationMap = new Map<string, Conversation>();

	const unreadUsers = new Set<string>();

	for (const message of messages) {
		// Control null, for Deleted User
		if (!message.sender || !message.recipient) continue;

		// Get conversation partner(会話相手の取得)
		const otherUser =
			message.sender.userId === userId ? message.recipient : message.sender;

		// ③ Get unread message info and add these(未読情報を付与)
		// Record user of unread(未読メッセージの記録)
		if (
			message.sender.userId === otherUser.userId &&
			message.recipient.userId === userId &&
			message.dateRead === null
		) {
			unreadUsers.add(otherUser.userId);
		}

		// 最新メッセージからConversation生成
		// has=同じユーザーを1回だけ登録 set=未読ユーザーを重複なく記録するため
		if (!conversationMap.has(otherUser.userId)) {
			conversationMap.set(otherUser.userId, {
				userId: otherUser.userId,
				name: otherUser.name,
				image: otherUser.image,
				lastMessage: message.text,
				lastMessageSenderId: message.sender.userId,
				created: message.created,
				dateRead: message.dateRead,
				hasUnread: false, //Add later
			});
		}
	}

	// 配列に戻す
	return Array.from(conversationMap.values()).map((conversation) => ({
		...conversation,
		hasUnread: unreadUsers.has(conversation.userId),
	}));
}

// Message一覧からConversation一覧を組み立てた中から1件取得する
export function getConversation(
	messages: ConversationMessage[],
	ownerUserId: string,
	partnerUserId: string,
): Conversation | undefined {
	// messages(Message[]) -> Conversation[]
	const conversations = buildConversation(messages, ownerUserId);

	// 更新すべきConversationを1件取得
	return conversations.find((c) => c.userId === partnerUserId);
}
