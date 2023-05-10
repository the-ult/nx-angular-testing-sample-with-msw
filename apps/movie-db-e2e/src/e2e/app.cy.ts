import { Movies } from '@ult/movie/data-access';
import { mswMock, mswResetWorker } from '@ult/shared/test/cypress';
import { MoviesPopularPage2 } from '@ult/shared/test/mocks';

const TEST_DATA: Movies = MoviesPopularPage2;

describe('Movies Page', () => {
  before(() => {
    cy.visit('/');
  });

  after(() => mswResetWorker());

  it('should display welcome message', () => {
    /// Override the default mock-data and use the page 2 data
    mswMock('movie/popular', TEST_DATA);

    cy.url().should('contain', `/movies`);

    /// ---------------------------------------------------------------
    cy.log('CHECK HEADER');
    /// ---------------------------------------------------------------
    cy.findByRole('heading', { level: 2, name: 'Popular Movies' })
      .should('be.visible')
      .should('have.text', 'Popular Movies');

    cy.checkMoviesDisplayed(TEST_DATA);

    /// ---------------------------------------------------------------
    cy.log('CHECK MOVIE LINK');
    /// ---------------------------------------------------------------
    cy.findAllByTestId('movie-page-media-card').first().click();
    cy.url().should('contain', `/movies/${TEST_DATA.results[0].id}`);

    cy.findByText(TEST_DATA.results[0].title).should('be.visible');
  });
});
