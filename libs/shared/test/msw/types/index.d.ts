import { graphql, rest, SetupWorkerApi } from 'msw';

export {};

declare global {
  interface Window {
    Cypress: Cypress.Cypress;
    msw: {
      graphql: typeof graphql;
      rest: typeof rest;
      worker: SetupWorkerApi;
    };
  }
}
