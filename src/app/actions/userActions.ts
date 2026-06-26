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
	memberCreateSchema,
	MemberCreateSchema,
} from '@/lib/schema/memberCreateSchema';
import { signOut } from '@/auth';

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

		const { name, description, city, country, searchGender } = validated.data;

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
				searchGender,
			},
		});
		return { status: 'success', data: member };
	} catch (error) {
		console.error(error);

		return { status: 'error', error: 'Something went wrong' };
	}
}

export async function addImage(url: string, publicId: string) {
	try {
		const userId = await getAuthUserId();

		const member = await prisma.member.findUnique({
			where: { userId },
			include: {
				photos: {
					select: {
						id: true,
					},
				},
			},
		});

		// Judge user already have a photo
		const isFirstPhoto = member?.photos.length === 0;

		return prisma.member.update({
			where: { userId },
			data: {
				...(isFirstPhoto && { image: url }),
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
		console.error(error);
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
		console.error(error);
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
		console.error(error);
		throw error;
	}
}

// Get user info from Member
export async function getUserInfoForNav() {
	try {
		const userId = await getAuthUserId();

		return await prisma.member.findUnique({
			where: { userId },
			select: { name: true, image: true },
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// After registered, complete profile to make Member
export async function createMemberProfile(
	data: MemberCreateSchema,
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

		const validated = memberCreateSchema.safeParse(data);

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
		console.error(error);

		return { status: 'error', error: 'Something went wrong' };
	}
}

// Delete user account
export async function deleteAccount() {
	try {
		const userId = await getAuthUserId();

		const member = await prisma.member.findUnique({
			where: { userId },
			include: {
				photos: true,
			},
		});

		if (!member) {
			return { status: 'error', error: 'Member not found' };
		}

		// Delete pictures on cloudinary
		for (const photo of member.photos) {
			if (photo.publicId) {
				await cloudinary.uploader.destroy(photo.publicId);
			}
		}

		await prisma.user.delete({
			where: { id: userId },
		});

		await signOut({
			redirectTo: '/login',
		});
	} catch (error) {
		console.error(error);

		return { status: 'error', error: 'Something went wrong' };
	}
}
