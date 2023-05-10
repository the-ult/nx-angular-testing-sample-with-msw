import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { ENV_MOCK } from '@ult/shared/test/mocks';
import { MountConfig } from 'cypress/angular';
import { MoviesPage } from './movies.page';

describe(MoviesPage.name, () => {
  // before(() => startMswForBrowser());

  const config: MountConfig<MoviesPage> = {
    declarations: [],
    // TODO: use provideHttpClientTesting()
    imports: [HttpClientTestingModule],
    //   TODO: create test ENV
    providers: [provideHttpClientTesting(), { provide: ENVIRONMENT, useValue: ENV_MOCK }],
  };

  it('renders', () => {
    // const TEST_DATA = MoviesPopularPage2;
    // /// Override the default mock-data
    // mswMock('movie/popular', TEST_DATA);

    cy.mount(MoviesPage, config);

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
