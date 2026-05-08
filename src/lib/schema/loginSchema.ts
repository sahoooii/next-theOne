import { z } from 'zod';

// 実際にチェックするルール
export const loginSchema = z.object({
	email: z.string().refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
		message: 'Invalid email address.',
	}),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters.' }),
});

// 設計図(型)
export type LoginSchema = z.infer<typeof loginSchema>;
