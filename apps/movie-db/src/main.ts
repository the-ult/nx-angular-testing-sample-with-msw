import { provideHttpClient } from '@angular/common/http';
import {
  enableProdMode,
  ENVIRONMENT_INITIALIZER,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withRouterConfig } from '@angular/router';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { MswService } from '@ult/shared/test/msw';

import { AppRoot } from './app/app.root';
import { MOVIE_DB_ROUTES } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppRoot, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(
      MOVIE_DB_ROUTES,
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
    provideHttpClient(),
    { provide: ENVIRONMENT, useValue: environment },
    // ! FIXME: Is this the proper way to initialize the MswService? Or should we use
    // ! the APPLICATION_INITIALIZER
    // ! AND WHY -> Add documentation
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue() {
        inject(MswService).initMswForBrowser();
      },
    },
  ],
}).catch((error) => console.error(error));
