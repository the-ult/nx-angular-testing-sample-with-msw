import { Movie } from './movie.model';

export type MediaCardInput = Pick<
  Movie,
  'id' | 'poster_path' | 'release_date' | 'title' | 'vote_average'
>;
