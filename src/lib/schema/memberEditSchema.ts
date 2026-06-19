import { z } from 'zod';
import { memberBaseSchema } from './memberBaseSchema';

export const memberEditSchema = z.object({
	...memberBaseSchema,
	name: z.string().min(1, { message: 'Name must be at least 1 characters.' }),
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
