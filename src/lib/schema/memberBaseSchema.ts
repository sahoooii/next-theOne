import { z } from 'zod';
import { SearchGender } from '@prisma/client';

	// Future Features
	// - Relationship Goal
	// - Interest Tags
export const memberBaseSchema = {
	description: z.string().min(10, {
		message: 'Tell us about yourself in at least 10 characters.',
	}),
	city: z.string().min(1, {
		message: 'City must be at least 1 character.',
	}),
	country: z.string().min(1, {
		message: 'Please select your country',
	}),
	searchGender: z.enum(SearchGender, {
		message: 'Please select the gender you are looking for',
	}),
};

export type MemberBaseSchema = z.infer<typeof memberBaseSchema>;
