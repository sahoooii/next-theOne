import { z } from 'zod';

// 実際にチェックするルール(runtime)
export const registerSchema = z.object({
	name: z.string().min(1, { message: 'Name must be at least 1 characters.' }),
	email: z.string().refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
		message: 'Invalid email address.',
	}),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters.' }),
});

// 設計図(型)(compile時)
export type RegisterSchema = z.infer<typeof registerSchema>;
