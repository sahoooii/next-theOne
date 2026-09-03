'use server';

import { prisma } from '@/lib/prisma';

import { ChatPartner } from '@/types/prisma';
import { MembersCursor } from '@/types/members';

import { SearchGender } from '@prisma/client';

import { getAuthUserId } from './authActions';

//cursor: 前回どこまで読んだかを示す目印
type GetMembersParams = {
	cursor?: MembersCursor;
	limit?: number;
};

export async function getMembers({
	cursor,
	limit = 12,
}: GetMembersParams = {}) {
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

		// Candidate is discoverable when:
		// 1. Candidate is not myself
		// 2. My searchGender matches candidate.gender
		//    OR my searchGender is ANY
		// 3. Candidate's searchGender matches my gender
		//    OR candidate's searchGender is ANY

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

		// createdがcursorより古い OR createdが同じで、idがcursorより小さい
		const cursorFilter = cursor
			? {
					OR: [
						{
							created: {
								lt: cursor.created, //less than
							},
						},
						{
							created: cursor.created,
							id: {
								lt: cursor.id,
							},
						},
					],
				}
			: {};

		const members = await prisma.member.findMany({
			// Exclude login user
			where: {
				NOT: {
					userId: userId,
				},
				AND: [genderFilter, searchGenderFilter, cursorFilter],
			},
			orderBy: [
				{
					created: 'desc',
				},
				{
					id: 'desc',
				},
			],
			take: limit + 1, //limit: 表示 +1: 次があるか確認
		});

		// 次のページにまたがるのかジャッジ
		const hasNextPage = members.length > limit;

		// 実際に返すMemberを12件に戻す
		const resultMembers = hasNextPage ? members.slice(0, limit) : members;

		// Memberの最後をcursorにする(次回の目印を作る)
		const nextCursor = hasNextPage
			? {
					created: resultMembers[resultMembers.length - 1].created,
					id: resultMembers[resultMembers.length - 1].id,
				}
			: null;

		return {
			members: resultMembers,
			nextCursor,
		};
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

// Home: Guest
export async function getGuestTodaysPicks() {
	try {
		return await prisma.member.findMany({
			where: {
				image: {
					not: null,
				},
			},
			orderBy: [
				{
					updated: 'desc',
				},
				{
					id: 'desc',
				},
			],
			take: 3,
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getGuestNewMembers() {
	return prisma.member.findMany({
		where: {
			image: {
				not: null,
			},
		},
		orderBy: [
			{
				created: 'desc',
			},
			{
				id: 'desc',
			},
		],
		take: 6,
	});
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
