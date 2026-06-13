import { z } from 'zod';

export const memberEditSchema = z.object({
	name: z.string().min(1, { message: 'Name must be at least 1 characters.' }),
	description: z.string().min(10, {
		message: 'Tell us about yourself in at least 10 characters.',
	}),
	city: z.string().min(1, {
		message: 'City must be at least 1 characters.',
	}),
	country: z.string().min(1, {
		message: 'Country must be at least 1 characters.',
	}),

	// TODO:
	// Add searchGender when MemberProfileForm replaces EditForm
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>
