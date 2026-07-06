import { Prisma } from '@prisma/client';

export type ActionResult<T> =
	| { status: 'success'; data: T }
	| { status: 'error'; error: Record<string, string> | string };

// Prisma.MessageGetPayload=Prisma query の「戻り値の型」を自動生成する仕組み
export type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
	select: {
		id: true;
		text: true;
		created: true;
		dateRead: true;
		sender: {
			select: { userId: true; name: true; image: true };
		};
		recipient: {
			select: { userId: true; name: true; image: true };
		};
	};
}>;

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

// UI Model
export type Conversation = {
	userId: string;
	name: string;
	image: string | null;
	lastMessage: string;
	lastMessageSenderId: string;
	created: Date;
	dateRead: Date | null;
	hasUnread: boolean; //Manage unread message
};

// 通信で更新したいもの
export type ConversationPayload = {
	userId: string;
	lastMessage: string;
	lastMessageSenderId: string;
	created: string;
	dateRead: string | null;
	hasUnread: boolean;
};

export type SignOutProps = {
  isSigningOut: boolean;
  onSignOut: () => Promise<void>;
};
