import { z } from 'zod';

export const MediaSchema = z.object({
  id: z.number(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  original_language: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  popularity: z.number(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type Media = z.infer<typeof MediaSchema>;

export function createMediaResultSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    page: z.number(),
    results: z.array(schema),
    total_pages: z.number(),
    total_results: z.number(),
  });
}
