'use server';

import { prisma } from '@/lib/prisma';
import { fetchMutualLikes } from './likeActions';
import { Member } from '@prisma/client';

export async function getNewMatches(currentUserId: string) {
	//  matches= ex: Amanda, Lizz, Misato...
	const matches = await fetchMutualLikes(currentUserId);

	const newMatches: Member[] = [];

	// Check have a message from matched users
	for (const member of matches) {
		const hasMessage = await prisma.message.findFirst({
			where: {
				OR: [
					{
						senderId: currentUserId,
						recipientId: member.userId,
					},
					{
						senderId: member.userId,
						recipientId: currentUserId,
					},
				],
			},
		});

		if (!hasMessage) {
			newMatches.push(member);
		}
		return newMatches;
	}
}

// Refactor: future
// const newMatches = await Promise.all(
// 	matches.map(async (member) => {
// 		const hasMessage = await prisma.message.findFirst(...)

// 		return hasMessage ? null : member;
// 	})
// );
