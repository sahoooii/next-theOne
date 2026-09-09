'use server';

import { prisma } from '@/lib/prisma';

import { getAuthUserId } from './authActions';

import { SearchGender } from '@prisma/client';

type GetCompatibleMembersParams = {
	orderBy: 'updated' | 'created';
	take?: number;
};

export async function getCompatibleMembers({
	orderBy,
	take,
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

	// const testMember = await prisma.member.findUnique({
	// 	where: {
	// 		userId: 'cmq961gko000xz7i2j17vdwe9',
	// 	},
	// 	include: {
	// 		sourceLikes: true,
	// 	},
	// });

	// console.log('TEST MEMBER:', testMember);

	// const test = await prisma.member.findMany({
	// 	where: {
	// 		sourceLikes: {
	// 			none: {
	// 				sourceUserId: 'cmq961gap000uz7i2fqvorikv',
	// 			},
	// 		},
	// 	},
	// 	select: {
	// 		userId: true,
	// 		name: true,
	// 	},
	// });

	// console.log('test:', test);

	const members = await prisma.member.findMany({
		where: {
			userId: {
				not: userId,
			},
			sourceLikes: {
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

export async function getNewMembers() {
	return getCompatibleMembers({
		orderBy: 'created',
		take: 6,
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
