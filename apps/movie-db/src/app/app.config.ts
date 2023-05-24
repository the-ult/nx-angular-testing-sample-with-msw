import { provideHttpClient, withInterceptors } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { ENVIRONMENT_INITIALIZER } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { authInterceptor } from '@ult/shared/core';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { initMswForAngularApp } from '@ult/shared/test/msw';
import { environment } from '../environments/environment';
import { MOVIE_DB_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(),
    provideRouter(
      MOVIE_DB_ROUTES,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    provideHttpClient(withInterceptors([authInterceptor])),

    { provide: ENVIRONMENT, useValue: environment },
    // ! FIXME: Is this the proper way to initialize the MswService? Or should we use
    // ! the APPLICATION_INITIALIZER
    // ! AND WHY -> Add documentation
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => initMswForAngularApp(),
    },
  ],
};
