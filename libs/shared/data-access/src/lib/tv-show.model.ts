import { z } from 'zod';
import { createMediaResultSchema, MediaSchema } from './media.model';

// FIXME: use zod to add title property?
export const TvShowDetailSchema = z.object({
	backdrop_path: z.string().nullable(),
	created_by: z.array(
		z.object({
			id: z.number(),
			credit_id: z.string(),
			name: z.string(),
			gender: z.number(),
			profile_path: z.string().nullable(),
		}),
	),
	episode_run_time: z.array(z.number()),
	first_air_date: z.string(),
	genres: z.array(z.object({ id: z.number(), name: z.string() })),
	homepage: z.string(),
	id: z.number(),
	in_production: z.boolean(),
	languages: z.array(z.string()),
	last_air_date: z.string(),
	last_episode_to_air: z.object({
		air_date: z.string(),
		episode_number: z.number(),
		id: z.number(),
		name: z.string(),
		overview: z.string(),
		production_code: z.string(),
		season_number: z.number(),
		still_path: z.string().nullable(),
		vote_average: z.number(),
		vote_count: z.number(),
	}),
	name: z.string(),
	next_episode_to_air: z.null(),
	networks: z.array(
		z.object({
			name: z.string(),
			id: z.number(),
			logo_path: z.string().nullable(),
			origin_country: z.string(),
		}),
	),
	number_of_episodes: z.number(),
	number_of_seasons: z.number(),
	origin_country: z.array(z.string()),
	original_language: z.string(),
	original_name: z.string(),
	overview: z.string(),
	popularity: z.number(),
	poster_path: z.string().nullable(),
	production_companies: z.array(
		z.object({
			id: z.number(),
			logo_path: z.string().nullable(),
			name: z.string(),
			origin_country: z.string(),
		}),
	),
	production_countries: z.array(z.object({ iso_3166_1: z.string(), name: z.string() })),
	seasons: z.array(
		z.object({
			air_date: z.string(),
			episode_count: z.number(),
			id: z.number(),
			name: z.string(),
			overview: z.string(),
			poster_path: z.string(),
			season_number: z.number(),
		}),
	),
	spoken_languages: z.array(
		z.object({
			english_name: z.string(),
			iso_639_1: z.string(),
			name: z.string(),
		}),
	),
	status: z.string(),
	tagline: z.string(),
	type: z.string(),
	vote_average: z.number(),
	vote_count: z.number(),
});

export const TVShowSchema = MediaSchema.extend({
	first_air_date: z.string(),
	name: z.string(),
	original_name: z.string(),
});

export const TVShowsSchema = createMediaResultSchema(TVShowSchema);

export type TvShowDetail = z.infer<typeof TvShowDetailSchema>;
export type TvShow = z.infer<typeof TVShowSchema>;
export type TvShows = z.infer<typeof TVShowsSchema>;
