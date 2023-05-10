import { setupWorker, StartOptions } from 'msw';
import { HANDLERS } from '../handlers';

type UnhandledRequestStrategy = StartOptions['onUnhandledRequest'];

export type Options = {
  mswFile: string;
  onUnhandledRequest: UnhandledRequestStrategy;
  scope?: string;
};

export const mswBrowserWorker = setupWorker(...HANDLERS);

export const startMswForBrowser = async (
  mswFile = 'mockServiceWorker.js',
  scope = '/',
  onUnhandledRequest: UnhandledRequestStrategy = 'bypass'
) => {
  await mswBrowserWorker.start({
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

  return { mswBrowserWorker };

  /**
   * Add the MSW objects to the window, so we can easily use them with Cypress
   * @see: {@link [MSW Cypress example](https://mswjs.io/docs/api/setup-worker/use#examples)}
   */
  // ! FIXME: seems to be needed voor E2E only? Move to Cypress?
  // ! FIXME: somehow the types do not work yet
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // window.msw = { graphql, rest, worker: mswBrowserWorker };
};
