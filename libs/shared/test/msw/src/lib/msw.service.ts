import { graphql, rest } from 'msw';

import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { startMswForBrowser } from './browser';
// import { startMswForBrowser } from './browser';

/**
 * When we are using the mock environment,
 * we need to check if mswjs.io is available and wait for it to be ready.
 *
 * @see: https://mswjs.io/docs/api/setup-worker/use#examples
 *
 * @usage
 * ```ts
 * {
 *    provide: ENVIRONMENT_INITIALIZER,
 *    multi: true,
 *    useValue() {
 *      inject(MswService).initMswForBrowser();
 *    },
 * },
 * ```
 *
 */
@Injectable({ providedIn: 'root' })
export class MswService {
  initMswForBrowser() {
    // !FIXME: use other environment variable
    const { apiMocking, production } = inject(ENVIRONMENT);

    if (apiMocking && !production) {
      const { worker } = startMswForBrowser();

      /**
       * Add the MSW objects to the window, so we can easily use them with Cypress
       * @see: {@link [MSW Cypress example](https://mswjs.io/docs/api/setup-worker/use#examples)}
       */
      // ! FIXME: seems to be needed voor E2E only? Move to Cypress?
      // ! FIXME: somehow the types do not work yet
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.msw = { graphql, rest, worker };
    }
  }
}
