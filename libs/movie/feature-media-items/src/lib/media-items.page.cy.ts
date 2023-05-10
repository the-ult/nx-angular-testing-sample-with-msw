import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { mswMock } from '@ult/shared/test/cypress';
import { ENV_MOCK, MoviesPopularPage2 } from '@ult/shared/test/mocks';
import { startMswForBrowser, worker } from '@ult/shared/test/msw';
import { MountConfig } from 'cypress/angular';
import { MediaItemsPage } from './media-items.page';

describe(MediaItemsPage.name, () => {
  before(() => startMswForBrowser());
  afterEach(() => worker.resetHandlers());

  const config: MountConfig<MediaItemsPage> = {
    declarations: [],
    // TODO: use provideHttpClientTesting()
    imports: [HttpClientTestingModule],
    //   TODO: create test ENV
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    providers: [provideHttpClientTesting(), { provide: ENVIRONMENT, useValue: ENV_MOCK }],
  };

  it('renders', () => {
    const TEST_DATA = MoviesPopularPage2;
    /// Override the default mock-data
    mswMock('movie/popular', TEST_DATA);

    TestBed.overrideComponent(MediaItemsPage, { add: { providers: config.providers } });
    cy.mount(MediaItemsPage, config);

    /// ---------------------------------------------------------------
    cy.log('CHECK MOVIES');
    /// ---------------------------------------------------------------

    // ! FIXME => create command so we can re-use it
    // cy.findAllByTestId('movie-page-media-card')
    //   .should('have.length', 20)
    //   .each((movie, index: number) => {
    //     /// Get the values from our mock-data
    //     const { id, poster_path, release_date, title, vote_average } = TEST_DATA.results[index];

    //     /// ---------------------------------------------------------------
    //     cy.log('  LINK & POSTER');
    //     /// ---------------------------------------------------------------
    //     cy.wrap(movie)
    //       .findByRole('link')
    //       .should('have.attr', 'href', `/movies/${id}`)
    //       .findByRole('img')
    //       .should(
    //         'have.attr',
    //         'src',
    //         `https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`
    //       );

    //     /// ---------------------------------------------------------------
    //     cy.log(' VOTE');
    //     /// ---------------------------------------------------------------
    //     cy.wrap(movie).findByTestId('movie-score').should('have.text', vote_average);

    //     /// ---------------------------------------------------------------
    //     cy.log(' TITLE');
    //     /// ---------------------------------------------------------------
    //     cy.wrap(movie)
    //       .findByRole('heading', {
    //         level: 4,
    //         name: title,
    //       })
    //       .should('have.text', title);

    //     /// ---------------------------------------------------------------
    //     cy.log('  RELEASE DATE');
    //     /// ---------------------------------------------------------------
    //     const formattedDate = Intl.DateTimeFormat('en-US', {
    //       year: 'numeric',
    //       month: 'short',
    //       day: 'numeric',
    //     }).format(new Date(release_date));
    //     cy.wrap(movie).findByText(formattedDate).should('have.text', formattedDate);
    //   });
  });
});
