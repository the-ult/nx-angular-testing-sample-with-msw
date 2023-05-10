! TODO: -[ ] Initialize (zonder promise in `main.ts`)
! Gebruik van de BETA [MSW Fetch API support](https://github.com/mswjs/msw/discussions/1464)

- https://github.com/mswjs/msw/blob/feat/standard-api/MIGRATING.md

- Eventueel kijken of het met appInitializer of een andere kan?

# [MSWjs](https://mswjs.io/)

> Mock by intercepting requests on the network level. Seamlessly reuse the same mock definition for testing, development, and debugging. - [mswjs.io](https://mswjs.io/)

## Install

```console
npm install msw -D
```

## Alternative: Use ZODFixture instead of real(time) data:

- https://timdeschryver.dev/blog/using-zod-fixture-with-msw-to-generate-mocked-api-responses

## Create msw library

```console
npx nx generate @nrwl/workspace:library msw --directory=shared/test --skipBabelrc --tags=scope:test,type:msw --unitTestRunner=none --buildable --no-interactive
```

### Remove obsolete file

- `rm ./libs/shared/test/msw/src/lib/shared-test-msw.ts`

## Handlers

### Create initial getMoviesHandlers

- `touch libs/shared/test/msw/src/lib/handlers/movie.handlers.ts`

#### Return the mocks for the specific requests

```ts
import { MoviesPopularPage1, MoviesPopularPage2 } from '@ult/shared/test/mocks';
import { RequestHandler, rest } from 'msw';

export const MOVIE_HANDLERS: RequestHandler[] = [
  /**
   * Handle the requests for POPULAR Movies
   * @see: https://developers.themoviedb.org/3/movies/get-popular-movies
   */
  rest.get('/movie/popular', (req, res, ctx) => {
    const pageParam = req.url.searchParams.get('page');

    if (pageParam === '1') {
      return res(ctx.json(MoviesPopularPage1));
    }
    if (pageParam === '2') {
      return res(ctx.json(MoviesPopularPage2));
    }

    /// DEFAULT TO
    return res(ctx.json(MoviesPopularPage1));
  }),
];
```

### Create a `handlers/index.ts`

```
touch libs/shared/test/msw/src/lib/handlers/index.ts
```

```ts
import { RequestHandler } from 'msw';
import { MOVIE_HANDLERS } from './movie.handlers';

/**
 * Add new handlers here, so we can easily add new handlers to the browser and server
 */
export const HANDLERS: RequestHandler[] = [
  ...MOVIE_HANDLERS,
  /// add other handlers
];
```

## Export Handlers so we can import them in our tests

`libs/shared/test/msw/src/index.ts`

```ts
export * from './lib/handlers';
```

## Integrate

### Browser => For the Cypress / E2E tests

@see: [MSW Browser setup](https://mswjs.io/docs/getting-started/integrate/browser)

[Init mswjs](https://mswjs.io/docs/cli/init) to our msw library.

```
npx msw init ./libs/shared/test/msw/src/lib --save
```

#### Create the `browser.ts` file

`touch libs/shared/test/msw/src/lib/browser/browser.ts`

```ts
import { setupWorker } from 'msw';
import { HANDLERS } from '../handlers';

export type UNHANDLED_REQUEST_HANDLER = 'bypass' | 'error' | 'warn';

const MSW_FILE = 'mockServiceWorker.js';

export const startMswForBrowser = (onUnhandledRequest: UNHANDLED_REQUEST_HANDLER = 'bypass') => {
  const worker = setupWorker(...HANDLERS);

  worker.start({
    serviceWorker: { url: `./${MSW_FILE}` },
    // Return the first registered service worker found with the name
    // of `mockServiceWorker`, disregarding all other parts of the URL
    findWorker: (scriptURL) => scriptURL.includes(MSW_FILE),
    onUnhandledRequest,
  });
  return { worker };

  // throw new Error('startMswForBrowser can only be used in a browser context');
};
```

Create a `MswService` which we can use to start/initialize MSWjs:

```
touch libs/shared/test/msw/src/lib/msw.service.ts
```

```ts
@Injectable({ providedIn: 'root' })
export class MswService {
  initMswForBrowser() {
    // ! FIXME: use other environment variable
    const { mock, production } = inject(ENVIRONMENT);
    if (mock && !production) {
      const { worker } = startMswForBrowser();
      const mock = worker.use;

      /**
       * Add the MSW objects to the window, so we can easily use them with Cypress
       */
      window.msw = { graphql, mock, rest, worker };
    }
  }
}
```

```json
"paths": {
  ...
  "@ult/shared/test/msw/browser": ["libs/shared/test/msw/src/lib/browser/index.ts"],
}
```

### Node => For the Unit (Jest) tests

# Add MSWjs to your APP

Add the `mockServiceWorker.js` to your project assets

`apps/movie-db/project.json`

```json
  "assets": [
  "apps/movie-db/src/favicon.ico",
  "apps/movie-db/src/assets",
  {
    "glob": "mockServiceWorker.js",
    "input": "libs/shared/test/msw/src/lib",
    "output": "/"
  }
],
```

Import the worker in your (dev) `environment.ts`

`apps/movie-db/src/environments/environment.ts`

```ts
/**
 * Start the MSW service worker
 * Since we only add it to our development environment, it is only started here
 *
 * @see: /libs/shared/test/msw/README.md
 * eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
 */
import '@ult/shared/test/msw/browser';

export const environment = {
  production: false,
};
```

`apps/movie-db/src/main.ts`

```ts
/**
 * When we are using the mock environment,
 * we need to check if mswjs.io is available and wait for it to be ready.
 * @returns
 */
async function prepareWorkers(): Promise<void> {
  // !FIXME: use other environment variable
  if (!environment.production) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return window.__mockServerReady;
    // await repositoryWorker.start({ ... });
  }
}

prepareWorkers().then(() => {
  bootstrapApplication(AppRoot, {
    providers: [
      importProvidersFrom(BrowserAnimationsModule),
      provideRouter(
        MOVIE_DB_ROUTES,
        withRouterConfig({
          paramsInheritanceStrategy: 'always',
        })
      ),
      provideHttpClient(
        // withXsrfConfiguration({ cookieName: '', headerName: '' }),
        withJsonpSupport()
      ),
    ],
  }).catch((err) => console.error(err));
});
```

When you restart your application, you should see:

![MSW ENABLED](./img/msw-enabled.png 'MSW Enabled')

# Add MSWjs to Cypress

# Add MSWjs to your Unit/Integration tests
