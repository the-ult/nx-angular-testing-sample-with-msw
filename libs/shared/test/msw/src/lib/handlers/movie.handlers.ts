import {
  BlackAdam,
  MoviesPopularPage1,
  MoviesPopularPage2,
  WakandaForever,
} from '@ult/shared/test/mocks';
import { RequestHandler, rest } from 'msw';

export const MOVIE_HANDLERS: RequestHandler[] = [
  /**
   * Handle the requests for POPULAR Movies
   * @see: https://developers.themoviedb.org/3/movies/get-popular-movies
   */
  rest.get('movie/popular', (req, res, ctx) => {
    const pageParameter = req.url.searchParams.get('page');

    if (pageParameter === '1') {
      return res(ctx.json(MoviesPopularPage1));
    }
    if (pageParameter === '2') {
      return res(ctx.json(MoviesPopularPage2));
    }

    return res(ctx.json(MoviesPopularPage1));
  }),
  /**
   * Handle the requests for POPULAR Movies
   * @see: https://developers.themoviedb.org/3/movies/get-popular-movies
   */
  rest.get('movie/:movieId', (req, res, ctx) => {
    const movieId = +req.params['movieId'];

    // eslint-disable-next-line unicorn/numeric-separators-style
    if (movieId === 505642) {
      return res(ctx.json(WakandaForever));
    }
    // eslint-disable-next-line unicorn/numeric-separators-style
    if (movieId === 436270) {
      return res(ctx.json(BlackAdam));
    }

    return res(
      ctx.status(404),
      ctx.json({
        error: {
          code: 404,
          message: `Movie with ID: ${movieId} not found`,
          errors:{
            message: "Invalid parameter"
          },
        },
      })
    );
  }),
];
