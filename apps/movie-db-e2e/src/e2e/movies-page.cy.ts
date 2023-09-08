import type { Movies } from '@ult/shared/data-access';
import { mswMock, mswResetWorkerHandlers } from '@ult/shared/test/cypress';
import { MoviesPopularPage2 } from '@ult/shared/test/mocks';

const TEST_DATA: Movies = MoviesPopularPage2;

describe('Movies Page', () => {
  before(() => {
    cy.visit('/movies');
  });

  afterEach(() => mswResetWorkerHandlers());
  // afterEach(() => worker.resetHandlers());

  it('should display welcome message', () => {
    /// Override the default mock-data and use the page 2 data, to show how to use mswMock
    mswMock('movie/popular', TEST_DATA);

    cy.url().should('contain', `/movies`);

    /// ---------------------------------------------------------------
    cy.log('CHECK HEADER');
    /// ---------------------------------------------------------------
    cy.findByRole('heading', { level: 2, name: 'Popular Movies' })
      .should('be.visible')
      .should('have.text', 'Popular Movies');

    cy.findAllByTestId(/^media-item-page-media-card-/).should(
      'have.length',
      TEST_DATA.results.length,
    );

    /// Check each movie from our testdata
    for (const movie of TEST_DATA.results) {
      cy.checkMovieCardData(movie);
    }

    /// ---------------------------------------------------------------
    cy.log('CHECK MOVIE LINK');
    /// ---------------------------------------------------------------
    cy.findAllByTestId(/^media-item-page-media-card-/)
      .first()
      .click();
    cy.url().should('contain', `/movies/${TEST_DATA.results[0].id}`);

    cy.findByText(TEST_DATA.results[0].title).should('be.visible');
  });
});
