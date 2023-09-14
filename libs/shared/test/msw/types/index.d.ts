import type { graphql, http } from 'msw';
import type { SetupWorker } from 'msw/browser';

export {};

declare global {
  interface Window {
    Cypress: Cypress.Cypress;
    msw: {
      graphql: typeof graphql;
      http: typeof http;
      worker: SetupWorker;
    };
  }
}
