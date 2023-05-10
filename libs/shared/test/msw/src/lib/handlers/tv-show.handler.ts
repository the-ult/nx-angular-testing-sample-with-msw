// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import type { MediaError, TvShows } from '@ult/shared/data-access';
import { TVShowsPopularPage1, TVShowsPopularPage2 } from '@ult/shared/test/mocks';
import type { RequestHandler } from 'msw';
import { rest } from 'msw';

/**
 *
 * @see {@link [Type-safe API mocking with Mock Service Worker and TypeScript](https://dev.to/kettanaito/type-safe-api-mocking-with-mock-service-worker-and-typescript-21bf)}
 */
export const TV_SHOW_HANDLERS: RequestHandler[] = [
  rest.get<TvShows | MediaError>('/tv/popular', (request, response, ctx) => {
    const url = new URL(request.url);

    const pageParameter = Number(url.searchParams.get('page'));

    if (pageParameter === 0 || pageParameter === 1) {
      return response(ctx.json(TVShowsPopularPage1));
    }
    if (pageParameter === 2) {
      return response(ctx.json(TVShowsPopularPage2));
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
];
