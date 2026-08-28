'use server';

import { prisma } from '@/lib/prisma';
import { ChatPartner } from '@/types/prisma';

import { getAuthUserId } from './authActions';
import { SearchGender } from '@prisma/client';

// Candidate is discoverable when:
// 1. Candidate is not myself
// 2. My searchGender matches candidate.gender
//    OR my searchGender is ANY
// 3. Candidate's searchGender matches my gender
//    OR candidate's searchGender is ANY
export async function getMembers() {
	const userId = await getAuthUserId();

	try {
		const currentMember = await prisma.member.findUnique({
			where: {
				userId,
			},
			select: {
				gender: true,
				searchGender: true,
			},
		});

		if (!currentMember) {
			throw new Error('Current member not found');
		}

		// 自分が相手に求めている条件
		const genderFilter =
			currentMember.searchGender === SearchGender.ANY
				? {} //私は誰でも探すので、相手の gender では絞らない
				: { gender: currentMember.searchGender };

		// 相手も自分を探しているか
		const searchGenderFilter = {
			OR: [
				{
					searchGender: currentMember.gender as SearchGender,
				},
				{
					searchGender: SearchGender.ANY,
				},
			],
		};

		return prisma.member.findMany({
			// Exclude login user
			where: {
				NOT: {
					userId: userId,
				},
				...genderFilter,
				...searchGenderFilter,
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getMemberByUserId(userId: string) {
	try {
		return prisma.member.findUnique({ where: { userId } });
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getMemberPhotoByUserId(userId: string) {
	const member = await prisma.member.findUnique({
		where: {
			userId,
		},
		select: { photos: true },
	});

	if (!member) return null;

	return member.photos;
}

// For chat room: Chat partner info
export async function getChatPartner(
	userId: string,
): Promise<ChatPartner | null> {
	try {
		return prisma.member.findUnique({
			where: { userId },
			select: {
				userId: true,
				name: true,
				image: true,
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}
