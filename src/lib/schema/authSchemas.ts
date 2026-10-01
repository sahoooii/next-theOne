import { z } from 'zod';

// For reset password: set new password
export const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters.' }),

		confirmPassword: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters.' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

// For forgot password: Type email address at form
export const forgotPasswordSchema = z.object({
	email: z.string().refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
		message: 'Invalid email address.',
	}),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
