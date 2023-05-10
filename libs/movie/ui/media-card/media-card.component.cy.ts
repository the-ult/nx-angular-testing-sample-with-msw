import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { ENV_MOCK } from '@ult/shared/test/mocks';
import { UltMediaCardComponent } from './media-card.component';

import { MoviesPopularPage2 as TEST_DATA } from '@ult/shared/test/mocks';
import { MountConfig } from 'cypress/angular';
import { MediaCardInput } from './media-card.model';

describe(UltMediaCardComponent.name, () => {
  const mediaCardData: MediaCardInput = TEST_DATA.results[0];

  const config: MountConfig<UltMediaCardComponent> = {
    imports: [UltMediaCardComponent, RouterLinkWithHref, RouterTestingModule],
    providers: [{ provide: ENVIRONMENT, useValue: ENV_MOCK }],
  };

  it('renders', () => {
    // TODO: see how we can use the template syntax, so we can add the testid
    // TODO: and we can re-use: `cy.checkMovieCardData(mediaCardData)`
    // cy.mount(
    //   `<ult-media-card
    //     data-testid="movie-page-media-card-${mediaCardData.id}"
    //     [mediaData]="mediaCardData"
    //    ></ult-media-card>`,
    //   {
    //     ...config,
    //     componentProperties: { mediaData: mediaCardData },
    //   }
    // );
    // cy.checkMovieCardData(mediaCardData);

    const { id, poster_path, release_date, title, vote_average } = mediaCardData;

    cy.mount(UltMediaCardComponent, {
      ...config,
      componentProperties: { mediaData: mediaCardData },
    });

    cy.findByRole('link')
      .should('have.attr', 'href', `/movies/${id}`)
      .findByRole('img')
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .should('have.attr', 'src', `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`)
      .should('be.visible');

    /// ---------------------------------------------------------------
    cy.log(' VOTE');
    /// ---------------------------------------------------------------
    cy.findByTestId('movie-score').should('have.text', vote_average);

    /// ---------------------------------------------------------------
    cy.log(' TITLE');
    /// ---------------------------------------------------------------
    cy.findByRole('heading', {
      level: 4,
      name: title,
    }).should('have.text', title);

    /// ---------------------------------------------------------------
    cy.log('  RELEASE DATE');
    /// ---------------------------------------------------------------
    const formattedDate = Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(release_date));

    cy.findByText(formattedDate).should('have.text', formattedDate);
  });
});
