# Cypress

## Create shared/test/cypress library

```
npx nx generate @nx/workspace:library cypress --directory=shared/test --skipBabelrc --standaloneConfig --tags=scope:shared,type:test --unitTestRunner=none --no-interactive
```

### Types

To be able to use the MSW types in cypress we need to declare them:

`touch libs/shared/test/cypress/types/index.d.ts`

```ts
import { graphql, rest, SetupWorkerApi } from 'msw';

declare global {
  interface Window {
    Cypress?: unknown;
    msw: {
      graphql: typeof graphql;
      rest: typeof rest;
      worker: SetupWorker;
    };
  }
}
```

AND to your app-e2e `tsconfig.json`

`apps/movie-db-e2e/tsconfig.json`

```json
{
  "types"[
    "cypress",
    "node",
    "../../libs/shared/test/cypress/types"
  ]
}
```

# Bonus: Cypress mock commands

`touch libs/shared/test/cypress/src/lib/msw/msw.ts`

````ts
import { RequestHandler } from 'msw';

/**
 * Reset the msw mock server
 *
 * @usage
 * ```ts
 *  afterEach(() => mswResetWorker());
 * ```
 */
export const mswResetWorker = () => {
  Cypress.log({
    name: 'mswResetWorker',
    displayName: '🔐  RESET THE MSW WORKERS',
    autoEnd: true,
  });

  cy.window().then((win) => {
    const { worker } = win.msw;
    worker.resetHandlers();
  });
};

/**
 * Add a new MSW request handler to the msw worker
 *
 * Can be used to easily overwrite the default responses of the msw worker
 *
 * Checks whether the Cypress `env.mock` property is set. So you can include it in your tests
 * and it will be skipped, when the `mock` property is not set.
 *
 * @usage
 * ```ts
 * beforeEach(() => {
 *    mswMock([rest.get('movie/popular', (_req, res, ctx) => res(ctx.json(MoviesPopularPage2)))]);
 * });
 * ```
 *
 * @param handlers
 */
export const mswMock = (handlers: RequestHandler[]): void => {
  if (Cypress.env('apiMocking') === 'true') {
    Cypress.log({
      name: 'mswMock',
      displayName: '🔐  MOCK THE MSW WORKERS for given handlers',
      autoEnd: true,
    });

    cy.window().then((win) => {
      const { rest, worker } = win.msw;

      // worker.use(rest.get(url, () => HttpResponse.json(data)));
      worker.use(rest.get(url, (_req, res, ctx) => res(ctx.json(data))));
    });
  } else {
    // eslint-disable-next-line no-console, no-restricted-syntax
    console.info('🛑 !! MOCK ENV is not enabled !!');
  }
};
````

## app/my-app-e2e

add:

```ts
import '@ult/shared/test/cypress';
```

to

```
apps/movie-db-e2e/src/support/commands.ts
```

## RUN E2E

### Setup ENVIRONMENT for Cypress

See: [Setup Environment](/docs/ENVIRONMENT.md#for-e2e)

```
nx e2e movie-db-e2e [--watch --browser=chrome]
```

## BONUS Pro Tip =>

[Testing Library Cypress](https://testing-library.com/docs/cypress-testing-library/intro/)

```
npm i -D @testing-library/cypress
```

Add to `libs/shared/test/cypress/tsconfig.lib.json`

```json
{
  ...
  "types": ["node", "cypress", "@testing-library/cypress"],
  "include": ["**/*.ts", "./types/*.d.ts"]
}
```

AND to your app-e2e `tsconfig.json`

`apps/movie-db-e2e/tsconfig.json`

```json
{
  "types"[
    "cypress",
    "node",
    "../../libs/shared/test/cypress/types",
    "@testing-library/cypress"
  ]
}
```
