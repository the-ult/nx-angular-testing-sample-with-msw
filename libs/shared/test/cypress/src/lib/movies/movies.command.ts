// TODO: should we move these movie specific commands to the movie domain?

import type { Movie } from '@ult/shared/data-access';

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
      checkMovieCardData(movieData: Movie): Chainable<void>;
    }
  }
}

Cypress.Commands.add('checkMovieCardData', (movieData: Movie) => {
  /// ---------------------------------------------------------------
  Cypress.log({
    name: 'CHECK MOVIE',
    displayName: `🎬  Check movie: ${movieData.title}`,
    autoEnd: true,
  });
  /// ---------------------------------------------------------------

  const { id, poster_path, release_date, title, vote_average } = movieData;

  cy.findByTestId(`media-item-page-media-card-${id}`).within(($movie) => {
    /// ---------------------------------------------------------------
    cy.log('  LINK & POSTER');
    /// ---------------------------------------------------------------
    cy.wrap($movie)
      .findByRole('link')
      .should('have.attr', 'href', `/movies/${id}`)
      .findByRole('img')
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .should('have.attr', 'src', `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`)
      .should('be.visible');

    /// ---------------------------------------------------------------
    cy.log(' VOTE');
    /// ---------------------------------------------------------------
    cy.wrap($movie).findByTestId('movie-score').should('have.text', vote_average);

    /// ---------------------------------------------------------------
    cy.log(' TITLE');
    /// ---------------------------------------------------------------
    cy.wrap($movie)
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

    cy.wrap($movie).findByText(formattedDate).should('have.text', formattedDate);
  });
});
