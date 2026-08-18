'use server';

import { prisma } from '@/lib/prisma';
import { NewMatch } from '@/types/matches';

// 初期表示用: Matchしていて、まだメッセージを送り合っていない人を全件取得
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

// Realtime用: 特定の1人だけNew Matchか確認
export async function getNewMatch(
	currentUserId: string,
	partnerUserId: string,
): Promise<NewMatch | null> {
	const member = await prisma.member.findFirst({
		where: {
			userId: partnerUserId,
			senderMessages: {
				none: {
					recipientId: currentUserId,
				},
			},
			recipientMessages: {
				none: {
					senderId: currentUserId,
				},
			},
		},
		select: {
			userId: true,
			name: true,
			image: true,
		},
	});

	return member;
}
