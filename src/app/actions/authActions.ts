'use server';

import { prisma } from '@/lib/prisma';
import { registerSchema, RegisterSchema } from '@/lib/schema/registerForm';
import bcrypt from 'bcryptjs';

export async function registerUser(data: RegisterSchema) {
	const validated = registerSchema.safeParse(data);

	// Fix easy to use in FE
	if (!validated.success) {
		const fieldErrors = validated.error.issues.reduce(
			(acc, issue) => {
				const field = issue.path[0] as string;
				acc[field] = issue.message;
				return acc;
			},
			{} as Record<string, string>,
		);

		return { error: fieldErrors };
	}

	const { name, email, password } = validated.data;

	const hashedPassword = await bcrypt.hash(password, 10);

	// Check a user already registered
	const existingUser = await prisma.user.findUnique({
		where: { email },
	});

	if (existingUser) return { error: 'User already exists' };

	return prisma.user.create({
		data: {
			name,
			email,
			passwordHash: hashedPassword,
		},
	});
}
