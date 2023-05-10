import { graphql, rest, SetupWorkerApi } from 'msw';

declare global {
  interface Window {
    Cypress?: unknown;
    msw: {
      graphql: typeof graphql;
      rest: typeof rest;
      worker: SetupWorkerApi;
      // mock: typeof setupWorkerApi.use;
    };
  }
  // interface AUTWindow {
  //   msw: {
  //     graphql: typeof graphql;
  //     mock: any;
  //     rest: typeof rest;
  //     worker: SetupWorkerApi;
  //   };
  // }
}
