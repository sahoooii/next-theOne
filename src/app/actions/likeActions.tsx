'use server';

import { prisma } from '@/lib/prisma';
import { getAuthUserId } from './authActions';

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
	try {
		const userId = await getAuthUserId();
		// if already liked, delete the like
		if (isLiked) {
			await prisma.like.delete({
				where: {
					// 複合キーは「まとめて1つのIDだけど、その中身は2つ必要
					sourceUserId_targetUserId: {
						sourceUserId: userId,
						targetUserId,
					},
				},
			});
		} else {
			await prisma.like.create({
				data: {
					sourceUserId: userId,
					targetUserId,
				},
			});
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function fetchCurrentUserLikeIds() {
	try {
		const userId = await getAuthUserId();

		const likeIds = await prisma.like.findMany({
			where: {
				sourceUserId: userId,
			},
			select: {
				targetUserId: true,
			},
		});

		return likeIds.map((like) => like.targetUserId);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// likeしたmembers list
export async function fetchLikedMembers(type = 'source') {
	try {
		const userId = await getAuthUserId();
		// source → target
		switch (type) {
			case 'source': //自分がいいねした相手
				return await fetchSourceLikes(userId);
			case 'target': //自分にいいねしてきた相手
				return await fetchTargetLikes(userId);
			case 'mutual': //お互いにいいねしている関係（マッチ状態）
				return await fetchMutualLikes(userId);
			default:
				return [];
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}

//自分がいいねした相手達
async function fetchSourceLikes(userId: string) {
	const sourceList = await prisma.like.findMany({
		where: {
			sourceUserId: userId,//自分
		},
		select: {
			targetMember: true,//自分がlikeした誰か
		},
	});
	return sourceList.map((x) => x.targetMember);
}

//自分にいいねしてきた相手達
async function fetchTargetLikes(userId: string) {
	const targetList = await prisma.like.findMany({
		where: {
			targetUserId: userId,//targetは自分
		},
		select: {
			sourceMember: true,//相手は自分にlikeしてきた誰か
		},
	});
	return targetList.map((x) => x.sourceMember);
}

// お互いにいいねしている関係達
// likedUser.map((x) => x.targetUserId)
export async function fetchMutualLikes(userId: string) {
	// 自分がいいねした人を取る
	const likedUser = await prisma.like.findMany({
		where: {
			sourceUserId: userId,
		},
		select: {
			targetUserId: true,
		},
	});
	const likedIds = likedUser.map((x) => x.targetUserId);

	const mutualList = await prisma.like.findMany({
		where: {
			AND: [
				{ targetUserId: userId }, // 誰か → 自分
				{ sourceUserId: { in: likedIds } }, // その誰かが自分がいいねした人の中にいる,
			],
		},
		select: {
			sourceMember: true,
		},
	});
	return mutualList.map((x) => x.sourceMember);
}
