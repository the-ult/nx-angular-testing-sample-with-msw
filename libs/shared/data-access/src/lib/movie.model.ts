import { z } from 'zod';
import { createMediaResultSchema, MediaSchema } from './media.model';

export const MovieSchema = MediaSchema.extend({
  adult: z.boolean(),
  original_title: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
});

export const MoviesSchema = createMediaResultSchema(MovieSchema);

export type Movie = z.infer<typeof MovieSchema>;
export type Movies = z.infer<typeof MoviesSchema>;
