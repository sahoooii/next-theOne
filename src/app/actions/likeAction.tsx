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
