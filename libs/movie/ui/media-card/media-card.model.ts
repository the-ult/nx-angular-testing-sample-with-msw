import { Movie, TvShow } from '@ult/shared/data-access';

export type MediaCardInput =
  | Pick<Movie, 'id' | 'poster_path' | 'release_date' | 'title' | 'vote_average'>
  | Pick<TvShow, 'id' | 'poster_path' | 'first_air_date' | 'name' | 'vote_average'>;
