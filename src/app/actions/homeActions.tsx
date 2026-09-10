'use server';

import { prisma } from '@/lib/prisma';

import { getAuthUserId } from './authActions';

import { SearchGender } from '@prisma/client';

type GetCompatibleMembersParams = {
	orderBy: 'updated' | 'created';
	take?: number;
	excludeUserIds?: string[];
};

type GetNewMembersParams = {
	excludeUserIds?: string[];
};

type GetGuestNewMembersParams = {
	excludeUserIds?: string[];
};

export async function getCompatibleMembers({
	orderBy,
	take,
	excludeUserIds = [],
}: GetCompatibleMembersParams) {
	const userId = await getAuthUserId();

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
			? {}
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

	const members = await prisma.member.findMany({
		where: {
			userId: {
				not: userId,
				notIn: excludeUserIds,
			},
			image: {
				not: null,
			},
			targetLikes: {
				none: {
					sourceUserId: userId,
				},
			},
			AND: [genderFilter, searchGenderFilter],
		},
		orderBy: {
			[orderBy]: 'desc',
		},
		take,
	});

	return members;
}

export async function getTodaysPicks() {
	return getCompatibleMembers({
		orderBy: 'updated',
		take: 3,
	});
}

export async function getNewMembers({
	excludeUserIds = [],
}: GetNewMembersParams = {}) {
	return getCompatibleMembers({
		orderBy: 'created',
		take: 6,
		excludeUserIds,
	});
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

export async function getGuestNewMembers({
	excludeUserIds = [],
}: GetGuestNewMembersParams = {}) {
	return prisma.member.findMany({
		where: {
			image: {
				not: null,
			},
			userId: {
				notIn: excludeUserIds,
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
