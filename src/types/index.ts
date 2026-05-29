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

export type MessageDto = {
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
