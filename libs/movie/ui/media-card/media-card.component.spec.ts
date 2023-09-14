import { RouterLinkWithHref } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { ENV_MOCK } from '@ult/shared/test/mocks';

import { UltMediaCardComponent } from './media-card.component';

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
import * as TEST_DATA from '../../../shared/test/mocks/src/lib/movie/movies-popular-page-2.json';
import type { MediaCardInput } from './media-card.model';

describe('MediaCardComponent', () => {
  it('should create', async () => {
    const mediaCardData: MediaCardInput = TEST_DATA.results[0];

    await render(UltMediaCardComponent, {
      componentProperties: { mediaData: mediaCardData },
      imports: [RouterLinkWithHref],
      providers: [{ provide: ENVIRONMENT, useValue: ENV_MOCK }],
    });

    const { id, poster_path, release_date, title, vote_average } = mediaCardData;

    /// ---------------------------------------------------------------
    ///  LINK & POSTER
    /// ---------------------------------------------------------------

    expect(screen.getByRole('link')).toHaveAttribute('href', expect.stringContaining(`/movies/${id}`));

    const imgControl = screen.getByRole('img');
    expect(imgControl).toHaveAttribute(
      'src',
      // ! FIXME: should get proper path from ENVIRONMENT
      // expect.stringContaining(`https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      expect.stringContaining(`${poster_path}`),
    );
    expect(imgControl).toBeVisible();
    expect(imgControl).toHaveAttribute('width', '180');
    expect(imgControl).toHaveAttribute('height', '275');

    /// ---------------------------------------------------------------
    ///  VOTE
    /// ---------------------------------------------------------------
    expect(screen.getByTestId('movie-score')).toHaveTextContent(vote_average.toString());

    /// ---------------------------------------------------------------
    ///  TITLE
    /// ---------------------------------------------------------------
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: title,
      }),
    ).toHaveTextContent(title);

    /// ---------------------------------------------------------------
    ///  RELEASE DATE
    /// ---------------------------------------------------------------
    const formattedDate = Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(release_date));

    expect(screen.getByText(formattedDate)).toBeVisible();
  });
});
