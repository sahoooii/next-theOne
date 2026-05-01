'use server';

import { prisma } from '@/lib/prisma';
import { getAuthUserId } from './authActions';

export async function getMembers() {
	const userId = await getAuthUserId();

	try {
		return prisma.member.findMany({
			// Exclude login user
			where: {
				NOT: {
					userId: userId,
				},
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
