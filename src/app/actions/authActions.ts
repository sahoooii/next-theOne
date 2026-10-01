'use server';

import { AuthError } from 'next-auth';

import bcrypt from 'bcryptjs';

import { auth, signIn } from '@/auth';
import {
	generatePasswordResetToken,
	resetPassword,
} from '@/lib/auth/passwordReset';

import { User } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { LoginSchema } from '@/lib/schema/loginSchema';
import {
	registerSchema,
	RegisterSchema,
} from '@/lib/schema/registerFormSchema';

import { ActionResult } from '@/types';

export async function signInUser(
	data: LoginSchema,
): Promise<ActionResult<string>> {
	try {
		const result = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		});
		console.log(result);
		return { status: 'success', data: 'Logged In' };
	} catch (error) {
		console.log(error);

		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { status: 'error', error: 'Invalid credentials' };
				default:
					return { status: 'error', error: 'Something went wrong' };
			}
		} else {
			return { status: 'error', error: 'Something went wrong' };
		}
	}
}

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

export async function getUserByEmail(email: string) {
	return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
	return prisma.user.findUnique({ where: { id } });
}

// 絶対にログインしていなければならない処理
export async function getAuthUserId() {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) throw new Error('Unauthorized');

	return userId;
}

// For password forgot
// Create token
export async function requestPasswordReset(
	email: string,
): Promise<ActionResult<string>> {
	try {
		const user = await getUserByEmail(email);

		if (user?.passwordHash) {
			const rawToken = await generatePasswordResetToken(user.id);

			const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${rawToken}`;
			// console.log('PASSWORD RESET TOKEN:', rawToken);
			console.log('resetUrl:', resetUrl);
		}

		return {
			status: 'success',
			data: 'If an account exists, a password reset email has been sent.',
		};
	} catch (error) {
		console.log(error);

		return {
			status: 'error',
			error: 'Something went wrong',
		};
	}
}

export async function resetPasswordAction(token: string, password: string) {
	return resetPassword(token, password);
}
