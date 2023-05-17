// eslint-disable-next-line @nx/enforce-module-boundaries
import type { MediaError, TvShows } from '@ult/shared/data-access';
import { TVShowsPopularPage1, TVShowsPopularPage2 } from '@ult/shared/test/mocks';
import type { RequestHandler } from 'msw';
import { HttpResponse, rest } from 'msw';

/**
 *
 * @see {@link [Type-safe API mocking with Mock Service Worker and TypeScript](https://dev.to/kettanaito/type-safe-api-mocking-with-mock-service-worker-and-typescript-21bf)}
 */
export const TV_SHOW_HANDLERS: RequestHandler[] = [
  rest.get<TvShows | MediaError>('/tv/popular', ({ request }) => {
    const url = new URL(request.url);

    const pageParameter = Number(url.searchParams.get('page'));

    if (pageParameter === 0 || pageParameter === 1) {
      return HttpResponse.json<TvShows>(TVShowsPopularPage1);
    }
    if (pageParameter === 2) {
      return HttpResponse.json<TvShows>(TVShowsPopularPage2);
    }

    return HttpResponse.json<MediaError>(
      {
        status_code: 56,
        status_message: `Movies for page: ${pageParameter} not found`,
      },
      {
        status: 404,
      }
    );
  }),
];
