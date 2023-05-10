/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { MediaError, Movies } from '@ult/shared/data-access';
import { MoviesPopularPage1, MoviesPopularPage2 } from '@ult/shared/test/mocks';
import { RequestHandler, rest } from 'msw';

/**
 *
 * @see {@link [Type-safe API mocking with Mock Service Worker and TypeScript](https://dev.to/kettanaito/type-safe-api-mocking-with-mock-service-worker-and-typescript-21bf)}
 */
export const MOVIE_HANDLERS: RequestHandler[] = [
  /**
   * Handle the requests for POPULAR Movies
   * @see: https://developers.themoviedb.org/3/movies/get-popular-movies
   */
  /// New MSW API
  // rest.get<never, never, Movies | MovieError>('/movie/popular', ({ request }) => {
  //   const url = new URL(request.url);

  //   const pageParameter = Number(url.searchParams.get('page'));

  //   if (pageParameter === 0 || pageParameter === 1) {
  //     return HttpResponse.json<Movies>(MoviesPopularPage1);
  //   }
  //   if (pageParameter === 2) {
  //     return HttpResponse.json<Movies>(MoviesPopularPage2);
  //   }

  //   return HttpResponse.json<MovieError>(
  //     {
  //       status_code: 34,
  //       status_message: `Movies for page: ${pageParameter} not found`,
  //     },
  //     {
  //       status: 404,
  //     }
  //   );
  // }),
  /// OLD/CURRENT API 0.49.x
  rest.get<Movies | MediaError>('/movie/popular', (request, response, ctx) => {
    const url = new URL(request.url);

    const pageParameter = Number(url.searchParams.get('page'));

    if (pageParameter === 0 || pageParameter === 1) {
      return response(ctx.json(MoviesPopularPage1));
    }
    if (pageParameter === 2) {
      return response(ctx.json(MoviesPopularPage2));
    }

    return response(
      // Send a valid HTTP status code
      ctx.status(404),
      // And a response body, if necessary
      ctx.json({
        errorMessage: `Movies for page: ${pageParameter} not found`,
      })
    );
  }),

  /**
   * Handle the requests for POPULAR Movies
   * @see: https://developers.themoviedb.org/3/movies/get-popular-movies
   */
  // rest.get<{ movieId: string }, never, MovieDetail | MovieError>(
  //   '/movie/:movieId',
  //   ({ params }) => {
  //     const movieId = +params['movieId'];

  //     if (movieId === 436_270) {
  //       return HttpResponse.json<MovieDetail>(BlackAdam);
  //     }

  //     if (movieId === 505_642) {
  //       return HttpResponse.json<MovieDetail>(WakandaForever);
  //     }

  //     return HttpResponse.json<MovieError>({
  //       status_code: 56,
  //       status_message: `Movie with ID: ${movieId} not found`,
  //     });
  //   }
  // ),
];
