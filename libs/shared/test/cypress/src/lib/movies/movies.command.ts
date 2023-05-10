import { Movies } from '@ult/movie/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      /**
       * Checks if all movies in the given TEST-DATA are actually displayed.
       * Does this by checking the number of items displayed and
       * actually checking the displayed data of each item.
       *
       * @param testData
       */
      checkMoviesDisplayed(testData: Movies): Chainable<void>;
    }
  }
}

Cypress.Commands.add('checkMoviesDisplayed', (testData: Movies) => {
  /// ---------------------------------------------------------------
  cy.log('CHECK MOVIES');
  /// ---------------------------------------------------------------

  cy.findAllByTestId('movie-page-media-card')
    .should('have.length', testData.results.length)
    .each((movie, index) => {
      /// Get the values from our mock-data
      const { id, poster_path, release_date, title, vote_average } = testData.results[index];

      /// ---------------------------------------------------------------
      cy.log('  LINK & POSTER');
      /// ---------------------------------------------------------------
      cy.wrap(movie)
        .findByRole('link')
        .should('have.attr', 'href', `/movies/${id}`)
        .findByRole('img')
        .should('have.attr', 'src', `https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`);

      /// ---------------------------------------------------------------
      cy.log(' VOTE');
      /// ---------------------------------------------------------------
      cy.wrap(movie).findByTestId('movie-score').should('have.text', vote_average);

      /// ---------------------------------------------------------------
      cy.log(' TITLE');
      /// ---------------------------------------------------------------
      cy.wrap(movie)
        .findByRole('heading', {
          level: 4,
          name: title,
        })
        .should('have.text', title);

      /// ---------------------------------------------------------------
      cy.log('  RELEASE DATE');
      /// ---------------------------------------------------------------
      const formattedDate = Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(release_date));

      cy.wrap(movie).findByText(formattedDate).should('have.text', formattedDate);
    });
});
