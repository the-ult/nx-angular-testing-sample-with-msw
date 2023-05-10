import { z } from 'zod';
import { createMediaResultSchema, MediaSchema } from './media.model';

// export const MovieDetailSchema = z.object({
//   adult: z.boolean(),
//   backdrop_path: z.string().nullable(),
//   belongs_to_collection: z.null(),
//   budget: z.number(),
//   genres: z.array(z.object({ id: z.number(), name: z.string() })),
//   homepage: z.string().nullable(),
//   id: z.number(),
//   imdb_id: z.string().nullable(),
//   original_language: z.string(),
//   original_title: z.string(),
//   overview: z.string().nullable(),
//   popularity: z.number(),
//   poster_path: z.null(),
//   production_companies: z.array(
//     z.object({
//       id: z.number(),
//       logo_path: z.string().nullable(),
//       name: z.string(),
//       origin_country: z.string(),
//     })
//   ),
//   production_countries: z.array(z.object({ iso_3166_1: z.string(), name: z.string() })),
//   release_date: z.string(),
//   revenue: z.number(),
//   runtime: z.number().nullable(),
//   spoken_languages: z.array(z.object({ iso_639_1: z.string(), name: z.string() })),
//   status: z.string(),
//   tagline: z.string().nullable(),
//   title: z.string(),
//   video: z.boolean(),
//   vote_average: z.number(),
//   vote_count: z.number(),
// });

export const MovieSchema = MediaSchema.extend({
  adult: z.boolean(),
  original_title: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
});

export const MoviesSchema = createMediaResultSchema(MovieSchema);

// export type MovieDetail = z.infer<typeof MovieDetailSchema>;
export type Movie = z.infer<typeof MovieSchema>;
export type Movies = z.infer<typeof MoviesSchema>;
