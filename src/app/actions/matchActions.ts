'use server';

import { prisma } from '@/lib/prisma';
import { NewMatch } from '@/types/matches';

// source = Likeした人
// target = Likeされた人
export async function getNewMatches(
	currentUserId: string,
): Promise<NewMatch[]> {
	// Get users that the current user has liked / 自分がLikeしたユーザーのIDを取得
	const likedUsers = await prisma.like.findMany({
		where: {
			sourceUserId: currentUserId,
		},
		select: {
			targetUserId: true,
		},
	});

	// IDだけの配列にする
	// [{ targetUserId: "B" },{ targetUserId: "C" }] → ['B', 'C'];
	const likedUserIds = likedUsers.map((like) => like.targetUserId);

	// 相互Likeかつ、まだメッセージを交換していないユーザーを取得
	// Find the users who liked the current user back and have not exchanged any messages with them yet.
	const matches = await prisma.like.findMany({
		where: {
			sourceUserId: {
				in: likedUserIds,
			},
			targetUserId: currentUserId,

			// Check that the matched partner and current user have never exchanged messages.
			sourceMember: {
				// No message from the partner to the current user.
				senderMessages: {
					none: { recipientId: currentUserId },
				},
				// No message from the partner to the current user.
				recipientMessages: {
					none: {
						senderId: currentUserId,
					},
				},
			},
		},
		select: {
			// Return only the data needed by the New Matches UI.
			sourceMember: {
				select: {
					userId: true,
					name: true,
					image: true,
				},
			},
		},
	});

	return matches.map((match) => match.sourceMember);
}
