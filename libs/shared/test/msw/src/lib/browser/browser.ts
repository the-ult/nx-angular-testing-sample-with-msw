import { RequestHandler, setupWorker, StartOptions } from 'msw';
import { HANDLERS } from '../handlers';

type UnhandledRequestStrategy = StartOptions['onUnhandledRequest'];

export type Options = {
  mswFile: string;
  onUnhandledRequest: UnhandledRequestStrategy;
  scope?: string;
};

//  TODO ??: => use the promise, so we can wait for it
// TODO: improve this method => simplify
export const startMswForBrowser = (
  mswFile = 'mockServiceWorker.js',
  scope = '/',
  handlers: RequestHandler[] = HANDLERS,
  onUnhandledRequest: UnhandledRequestStrategy = 'bypass'
) => {
  const worker = setupWorker(...handlers);

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  worker.start({
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

  return { worker };

  // throw new Error('startMswForBrowser can only be used in a browser context');
};
