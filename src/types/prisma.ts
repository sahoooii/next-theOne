import { Prisma } from '@prisma/client';

// Note: For chat room aka members/[userId]/chat

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
