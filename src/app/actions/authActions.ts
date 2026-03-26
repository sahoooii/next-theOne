'use server';

import { prisma } from '@/lib/prisma';
import { registerSchema, RegisterSchema } from '@/lib/schema/registerForm';
import { ActionResult } from '@/types';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

export async function registerUser(
	data: RegisterSchema,
): Promise<ActionResult<User>> {
	try {
		const validated = registerSchema.safeParse(data);

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
		const { name, email, password } = validated.data;

		const hashedPassword = await bcrypt.hash(password, 10);

		// Check a user already registered
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) return { status: 'error', error: 'User already exists' };

		const user = await prisma.user.create({
			data: {
				name,
				email,
				passwordHash: hashedPassword,
			},
		});

		return { status: 'success', data: user };
	} catch (error) {
		console.log(error);
		return { status: 'error', error: 'Something went wrong' };
	}
}
