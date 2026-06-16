import { z } from 'zod';
import { Gender, SearchGender } from '@prisma/client';

export const memberProfileSchema = z.object({
	description: z.string().min(10, {
		message: 'Tell us about yourself in at least 10 characters.',
	}),
	city: z.string().min(1, {
		message: 'City must be at least 1 characters',
	}),
	country: z.string().min(1, {
		message: 'Please select your country',
	}),
	gender: z.enum(Gender, {
		message: 'Please select a gender',
	}),
	searchGender: z.enum(SearchGender, {
		message: 'Please select the gender you are looking for',
	}),
	dateOfBirth: z
		.date({
			message: 'Please select your date of birth',
		})
		.refine(
			(date) => {
				const today = new Date();
				const adultDate = new Date(
					today.getFullYear() - 18,
					today.getMonth(),
					today.getDate(),
				);

				return date <= adultDate;
			},
			{
				message: 'You must be at least 18 years old',
			},
		),
	// Future Features
	// - Relationship Goal
	// - Interest Tags
});

export type MemberProfileSchema = z.infer<typeof memberProfileSchema>;
