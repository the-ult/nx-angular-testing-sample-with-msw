import type { Movie, TvShow } from '@ult/shared/data-access';

type MovieCardInput = Pick<Movie, 'id' | 'poster_path' | 'release_date' | 'title' | 'vote_average'>;
type TvShowCardInput = Pick<TvShow, 'id' | 'poster_path' | 'first_air_date' | 'name' | 'vote_average'>;
export type MediaCardInput = MovieCardInput | TvShowCardInput;

export const isMovieCardInput = (input: MediaCardInput): input is MovieCardInput => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return (input as MovieCardInput).release_date !== undefined;
};
