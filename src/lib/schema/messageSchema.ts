import { z } from 'zod';

export const messageSchema = z.object({
	text: z.string().min(1, {
		message: 'Write something thoughtful',
	}),
});

export type MessageSchema = z.infer<typeof messageSchema>;
