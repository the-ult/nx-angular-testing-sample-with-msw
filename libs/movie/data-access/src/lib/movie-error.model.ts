import { z } from 'zod';

export const MovieErrorSchema = z.object({
  status_message: z.string(),
  success: z.boolean().optional(),
  status_code: z.number(),
});

export type MovieError = z.infer<typeof MovieErrorSchema>;
