import { z } from 'zod';
import { memberBaseSchema } from './memberBaseSchema';
import { RelationshipGoal } from '@prisma/client';

export const memberEditSchema = z.object({
	...memberBaseSchema,
	name: z.string().min(1, { message: 'Name must be at least 1 characters.' }),

	height: z
		.number()
		.min(100, { message: 'Height must be at least 100 cm.' })
		.max(250, { message: 'Height must be 250 cm or less.' })
		.multipleOf(0.1)
		.nullable()
		.optional(),
	languages: z.array(z.string()).optional(),
	relationshipGoals: z
		.array(z.enum(RelationshipGoal))
		.max(2, { message: 'You can select up to 2 relationship goals.' })
		.optional(),
	interests: z
		.array(z.string())
		.max(5, { message: 'You can select up to 5 interests.' })
		.optional(),
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
