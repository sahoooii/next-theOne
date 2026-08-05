import { prisma } from '@/lib/prisma';

// Check mutual match
export async function isMatched(
	userId: string,
	partnerUserId: string,
): Promise<boolean> {
	// Check both directions of Like simultaneously.(2方向のLikeを同時確認している)
	// A match exists only when both users have liked each other.(両方存在した場合だけmatch)
	const [userLike, partnerLike] = await Promise.all([
		// user -> partner
		prisma.like.findUnique({
			where: {
				sourceUserId_targetUserId: {
					sourceUserId: userId,
					targetUserId: partnerUserId,
				},
			},
		}),

		// partner -> user
		prisma.like.findUnique({
			where: {
				sourceUserId_targetUserId: {
					sourceUserId: partnerUserId,
					targetUserId: userId,
				},
			},
		}),
	]);

	return Boolean(userLike && partnerLike);
}
