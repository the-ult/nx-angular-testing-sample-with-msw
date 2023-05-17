import type { graphql, rest } from 'msw';
import type { SetupWorker } from 'msw/browser';

export {};

declare global {
  interface Window {
    Cypress: Cypress.Cypress;
    msw: {
      graphql: typeof graphql;
      rest: typeof rest;
      worker: SetupWorker;
    };
  }
}
