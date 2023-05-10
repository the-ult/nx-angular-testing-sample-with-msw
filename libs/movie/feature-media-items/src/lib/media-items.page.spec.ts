import { HttpClientModule } from '@angular/common/http';
import { render, screen, within } from '@testing-library/angular';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { ENV_MOCK } from '@ult/shared/test/mocks';
import { mswServer, rest } from '@ult/shared/test/msw/server';
import { MediaItemsPage } from './media-items.page';
/**
 * Sadly Jest (still) does not properly support ES Modules.
 * And does not support default export/import, so we cannot do:
 *
 * `import { MoviesPopularPage1 } from '@ult/shared/test/mocks';`
 * But we have to use relative imports
 *
 * @see {@link Jest - ES Modules | https://github.com/facebook/jest/issues/9430}
 */
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as TEST_DATA from '../../../../shared/test/mocks/src/lib/movie/movies-popular-page-2.json';

describe('MediaItemsPage', () => {
  it('should show all movies in cards', async () => {
    mswServer.use(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      rest.get('http://localhost:4200/movie/popular', (_req, response, ctx) =>
        response(ctx.json(TEST_DATA))
      )
    );
    // mswServer.use(
    //   rest.get<never, never, Movies | MovieError>('http://localhost:4200/movie/popular', () =>
    //     HttpResponse.json<Movies>(TEST_DATA)
    //   )
    // );

    await render(MediaItemsPage, {
      imports: [HttpClientModule],
      providers: [{ provide: ENVIRONMENT, useValue: ENV_MOCK }],
    });

    const headerControl = screen.getByRole('heading', { level: 2, name: 'Popular Movies' });

    expect(headerControl).toBeVisible();

    // Check all media-cards
    const allMediaCards = await screen.findAllByTestId(/^media-item-page-media-card-/);
    expect(allMediaCards).toHaveLength(TEST_DATA.results.length);

    /// Check each movie from our testdata
    /// TODO: code is almost the same as `cy.checkMovieCardData(movie);`
    /// TODO: See if we can create a re-usable test function
    for (const [index, mediaCardControl] of allMediaCards.entries()) {
      /// Get the data from the card from the TEST-DATA, so we can check the content of the media-cards
      const { id, poster_path, release_date, title, vote_average } = TEST_DATA.results[index];

      /// ---------------------------------------------------------------
      ///  LINK & POSTER
      /// ---------------------------------------------------------------

      expect(within(mediaCardControl).getByRole('link')).toHaveAttribute(
        'href',
        expect.stringContaining(`/${id}`)
        // expect.stringContaining(`/movies/${id}`)
      );

      expect(within(mediaCardControl).getByRole('img')).toHaveAttribute(
        'src',
        // ! FIXME: should get proper path from ENVIRONMENT
        // expect.stringContaining(`https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`)
        expect.stringContaining(`${poster_path}`)
      );
      expect(within(mediaCardControl).getByRole('img')).toBeVisible();

      /// ---------------------------------------------------------------
      ///  VOTE
      /// ---------------------------------------------------------------
      expect(within(mediaCardControl).getByTestId('movie-score')).toHaveTextContent(
        vote_average.toString()
      );

      /// ---------------------------------------------------------------
      ///  TITLE
      /// ---------------------------------------------------------------
      expect(
        within(mediaCardControl).getByRole('heading', {
          level: 4,
          name: title,
        })
      ).toHaveTextContent(title);

      /// ---------------------------------------------------------------
      ///  RELEASE DATE
      /// ---------------------------------------------------------------
      const formattedDate = Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(release_date));

      expect(within(mediaCardControl).getByText(formattedDate)).toBeVisible();
    }
  });
});
