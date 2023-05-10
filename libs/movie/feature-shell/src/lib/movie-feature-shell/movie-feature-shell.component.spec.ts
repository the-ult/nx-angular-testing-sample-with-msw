import { AsyncPipe, NgForOf } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { render, screen, within } from '@testing-library/angular';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { UltMediaCardComponent } from '@ult/shared/ui/media-card';

import { ENV_MOCK } from '@ult/shared/test/mocks';
import { MovieFeatureShellPage } from './movie-feature-shell.component';

describe('MovieFeatureShellComponent', () => {
  it('should create', async () => {
    await render(MovieFeatureShellPage, {
      imports: [UltMediaCardComponent, NgForOf, AsyncPipe, HttpClientTestingModule],
      providers: [{ provide: ENVIRONMENT, useValue: ENV_MOCK }],
    });

    const heroControl = screen.getByTestId('hero');
    expect(
      within(heroControl).getByRole('heading', {
        level: 1,
        name: 'Welcome to The Angular Movie DB',
      })
    ).toBeVisible();
  });

  // TODO: add extra tests
});
