/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */

// eslint-disable-next-line @nx/enforce-module-boundaries
import type { MediaError, MovieDetail, Movies } from '@ult/shared/data-access';
import {
  BlackAdam,
  MoviesPopularPage1,
  MoviesPopularPage2,
  WakandaForever,
} from '@ult/shared/test/mocks';
import type { RequestHandler } from 'msw';
import { HttpResponse, rest } from 'msw';

/**
 *
 * @see {@link [Type-safe API mocking with Mock Service Worker and TypeScript](https://dev.to/kettanaito/type-safe-api-mocking-with-mock-service-worker-and-typescript-21bf)}
 */
export const MOVIE_HANDLERS: RequestHandler[] = [
  /**
   * Handle the requests for POPULAR Movies
   * @see: https://developers.themoviedb.org/3/movies/get-popular-movies
   */
  rest.get<Movies | MediaError>('/movie/popular', ({ request }) => {
    const url = new URL(request.url);

    const pageParameter = Number(url.searchParams.get('page'));

    if (pageParameter === 0 || pageParameter === 1) {
      return HttpResponse.json<Movies>(MoviesPopularPage1);
    }
    if (pageParameter === 2) {
      return HttpResponse.json<Movies>(MoviesPopularPage2);
    }

    // return new Response(null, { status: 201 });
    return HttpResponse.json<MediaError>(
      {
        status_code: 34,
        status_message: `Movies for page: ${pageParameter} not found`,
      },
      {
        status: 404,
      }
    );
  }),

  /**
   * Handle the requests for POPULAR Movies
   * @see: https://developers.themoviedb.org/3/movies/get-popular-movies
   */
  rest.get<{ movieId: string }, never, MovieDetail | MediaError>(
    '/movie/:movieId',
    ({ params }) => {
      const movieId = +params['movieId'];

      if (movieId === 436_270) {
        return HttpResponse.json<MovieDetail>(BlackAdam);
      }

      if (movieId === 505_642) {
        return HttpResponse.json<MovieDetail>(WakandaForever);
      }

      return HttpResponse.json<MediaError>(
        {
          status_code: 56,
          status_message: `Movie with ID: ${movieId} not found`,
        },
        {
          status: 404,
        }
      );
    }
  ),
];
