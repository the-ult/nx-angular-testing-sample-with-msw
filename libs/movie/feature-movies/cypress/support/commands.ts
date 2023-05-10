import '@testing-library/cypress/add-commands';
import { HANDLERS } from '@ult/shared/test/msw';

import { setupWorker } from 'msw';

// import '@ult/shared/test/cypress';
import { mount } from 'cypress/angular';

///-----------------------------------------------------------------
/// SETUP MSW
///-----------------------------------------------------------------
const MSW_FILE = '/__cypress/src/mockServiceWorker.js';

const serviceWorker = setupWorker(...HANDLERS);

before(() =>
  serviceWorker.start({
    serviceWorker: {
      url: MSW_FILE,
      options: {
        scope: '/',
      },
    },
  })
);

afterEach(() => serviceWorker.resetHandlers());

///-----------------------------------------------------------------

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);
