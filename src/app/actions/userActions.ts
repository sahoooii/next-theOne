'use server';

import {
	memberEditSchema,
	MemberEditSchema,
} from '@/lib/schema/memberEditSchema';
import { ActionResult } from '@/types';
import { Member, Photo } from '@prisma/client';
import { getAuthUserId } from './authActions';
import { prisma } from '@/lib/prisma';
import { cloudinary } from '@/lib/cloudinary';
import {
	memberProfileSchema,
	MemberProfileSchema,
} from '@/lib/schema/memberProfileSchema';

export async function updateMemberProfile(
	data: MemberEditSchema,
	nameUpdated: boolean,
): Promise<ActionResult<Member>> {
	try {
		const userId = await getAuthUserId();

		const validated = memberEditSchema.safeParse(data);

		if (!validated.success) {
			const fieldErrors = validated.error.issues.reduce(
				(acc, issue) => {
					const field = issue.path[0] as string;
					acc[field] = issue.message;
					return acc;
				},
				{} as Record<string, string>,
			);
			return { status: 'error', error: fieldErrors };
		}

		const { name, description, city, country } = validated.data;

		if (nameUpdated) {
			await prisma.user.update({
				where: { id: userId },
				data: { name },
			});
		}

		const member = await prisma.member.update({
			where: { userId },
			data: {
				name,
				description,
				city,
				country,
			},
		});
		return { status: 'success', data: member };
	} catch (error) {
		console.log(error);

		return { status: 'error', error: 'Something went wrong' };
	}
}

export async function addImage(url: string, publicId: string) {
	try {
		const userId = await getAuthUserId();

		return prisma.member.update({
			where: { userId },
			data: {
				photos: {
					create: [
						{
							url,
							publicId,
						},
					],
				},
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function setMainImage(photo: Photo) {
	try {
		const userId = await getAuthUserId();

		await prisma.user.update({
			where: { id: userId },
			data: {
				image: photo.url,
			},
		});

		return prisma.member.update({
			where: { userId },
			data: {
				image: photo.url,
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function deleteImage(photo: Photo) {
	try {
		const userId = await getAuthUserId();

		if (photo.publicId) {
			await cloudinary.uploader.destroy(photo.publicId);
		}

		return prisma.member.update({
			where: { userId },
			data: {
				photos: {
					delete: {
						id: photo.id,
					},
				},
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getUserInfoForNav() {
	try {
		const userId = await getAuthUserId();

		return await prisma.user.findUnique({
			where: { id: userId },
			select: { name: true, image: true },
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Register complete profile to make Member
export async function createMemberProfile(
	data: MemberProfileSchema,
): Promise<ActionResult<Member>> {
	try {
		const userId = await getAuthUserId();

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { name: true },
		});

		if (!user?.name) {
			throw new Error('User name is required');
		}

		const validated = memberProfileSchema.safeParse(data);

		if (!validated.success) {
			const fieldErrors = validated.error.issues.reduce(
				(acc, issue) => {
					const field = issue.path[0] as string;
					acc[field] = issue.message;
					return acc;
				},
				{} as Record<string, string>,
			);
			return { status: 'error', error: fieldErrors };
		}

		const { description, city, country, gender, searchGender, dateOfBirth } =
			validated.data;

		// Guard duplicate user
		const existingMember = await prisma.member.findUnique({
			where: { userId },
		});

		if (existingMember) {
			return {
				status: 'error',
				error: 'Your profile has already been created',
			};
		}

		const member = await prisma.member.create({
			data: {
				userId,
				name: user.name,
				description,
				city,
				country,
				gender,
				searchGender,
				dateOfBirth,
			},
		});
		return { status: 'success', data: member };
	} catch (error) {
		console.log(error);

		return { status: 'error', error: 'Something went wrong' };
	}
}
