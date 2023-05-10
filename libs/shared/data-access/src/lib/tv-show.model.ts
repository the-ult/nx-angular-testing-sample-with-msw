import { z } from 'zod';
import { createMediaResultSchema, MediaSchema } from './media.model';

export const TVShowSchema = MediaSchema.extend({
  first_air_date: z.string(),
  name: z.string(),
  original_name: z.string(),
});

export const TVShowsSchema = createMediaResultSchema(TVShowSchema);

export type TvShow = z.infer<typeof TVShowSchema>;
export type TvShows = z.infer<typeof TVShowsSchema>;
