import { z } from 'zod';

export const MediaErrorSchema = z.object({
	status_message: z.string(),
	success: z.boolean().optional(),
	status_code: z.number(),
});

export type MediaError = z.infer<typeof MediaErrorSchema>;
