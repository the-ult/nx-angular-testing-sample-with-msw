# Cypress

## Create shared/test/cypress library

```
npx nx generate @nrwl/workspace:library cypress --directory=shared/test --skipBabelrc --standaloneConfig --tags=scope:shared,type:test --unitTestRunner=none --no-interactive
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
      mock: any;
      rest: typeof rest;
      worker: SetupWorkerApi;
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
  if (Cypress.env('mock') === 'true') {
    Cypress.log({
      name: 'mswMock',
      displayName: '🔐  MOCK THE MSW WORKERS for given handlers',
      autoEnd: true,
    });
    cy.window().then((win) => {
      const { worker } = win.msw;

      worker.use(...handlers);
    });
  }
};
````

## app/my-app-e2e

add: `import '@ult/shared/test/cypress';` to `apps/movie-db-e2e/src/support/e2e.ts`;

## RUN E2E

Add `--env.mock=true` to enable with mocking

```
nx e2e movie-db-e2e --env.mock=true [--watch]
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
