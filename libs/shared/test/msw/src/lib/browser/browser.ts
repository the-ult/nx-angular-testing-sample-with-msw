import { inject } from '@angular/core';
import { ENVIRONMENT } from '@ult/shared/data-access';
import { graphql, rest, setupWorker, StartOptions } from 'msw';
import { HANDLERS } from '../handlers';

type UnhandledRequestStrategy = StartOptions['onUnhandledRequest'];

export type Options = {
  mswFile: string;
  onUnhandledRequest: UnhandledRequestStrategy;
  scope?: string;
};

export const worker = setupWorker(...HANDLERS);

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
 *    useValue: () => initMswForBrowser()
 * },
 * ```
 */
export const startMswForBrowser = (
  mswFile = 'mockServiceWorker.js',
  scope = '/',
  onUnhandledRequest: UnhandledRequestStrategy = 'bypass'
) => {
  const { apiMocking, production } = inject(ENVIRONMENT);

  if (apiMocking && !production) {
    void worker.start({
      serviceWorker: {
        url: `${mswFile}`,
        options: {
          /// Narrow the scope of the Service Worker to intercept requests
          /// only from pages under this path.
          scope,
        },
      },
      // Return the first registered service worker found with the name
      // of `mockServiceWorker`, disregarding all other parts of the URL
      findWorker: (scriptURL) => scriptURL.includes(mswFile),
      onUnhandledRequest,
    });

    /**
     * Add the MSW objects to the window, so we can easily use them with Cypress
     * @see: {@link [MSW Cypress example](https://mswjs.io/docs/api/setup-worker/use#examples)}
     * ! FIXME: cypress types are not properly read.
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.Cypress) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.msw = { graphql, rest, worker };
    }
  }
};
