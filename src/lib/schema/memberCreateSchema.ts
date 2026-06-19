import { z } from 'zod';
import { Gender } from '@prisma/client';
import { memberBaseSchema } from './memberBaseSchema';

export const memberCreateSchema = z.object({
	...memberBaseSchema,
	gender: z.enum(Gender, {
		message: 'Please select a gender',
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
});

export type MemberCreateSchema = z.infer<typeof memberCreateSchema>;
