/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */

import { BlackAdam, MoviesPopularPage1, MoviesPopularPage2 } from '@ult/shared/test/mocks';
import { HttpResponse, RequestHandler, rest } from 'msw';

export const MOVIE_HANDLERS: RequestHandler[] = [
  /**
   * Handle the requests for POPULAR Movies
   * @see: https://developers.themoviedb.org/3/movies/get-popular-movies
   */
  rest.get('movie/popular', ({ request }) => {
    const url = new URL(request.url);

    const pageParameter = url.searchParams.get('page');

    if (pageParameter === '1') {
      return HttpResponse.json(MoviesPopularPage1);
    }
    if (pageParameter === '2') {
      return HttpResponse.json(MoviesPopularPage2);
    }

    return HttpResponse.json(MoviesPopularPage1);
  }),
  /**
   * Handle the requests for POPULAR Movies
   * @see: https://developers.themoviedb.org/3/movies/get-popular-movies
   */
  rest.get('movie/:movieId', ({ params }) => {
    const movieId = +params['movieId'];

    // eslint-disable-next-line unicorn/numeric-separators-style
    // ! FIXME: add proper ZOD type/schema
    // if (movieId === 505642) {
    //   return HttpResponse.json(WakandaForever);
    // }
    // eslint-disable-next-line unicorn/numeric-separators-style
    if (movieId === 436270) {
      return HttpResponse.json(BlackAdam);
    }

    return;

    // ! FIXME: add proper error response and ZOD schema

    // return HttpResponse.json({
    //   status: 404,
    //   errors: [
    //     {
    //       code: 404,
    //       message: `Movie with ID: ${movieId} not found`,
    //       errors: {
    //         message: 'Invalid parameter',
    //       },
    //     },
    //   ],
    // });
  }),
];
