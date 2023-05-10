import { MoviesPopularPage1, MoviesPopularPage2 } from '@ult/shared/test/mocks';
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
];
