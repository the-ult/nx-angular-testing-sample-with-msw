/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

import { mount } from 'cypress/angular';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// const MSW_FILE = '/mockServiceWorker.js';
// const worker = setupWorker(...HANDLERS);

// before((done) => {
//   worker
//     .start({
//       serviceWorker: {
//         url: `${MSW_FILE}`,
//         options: {
//           // Narrow the scope of the Service Worker to intercept requests
//           // only from pages under this path.
//           scope: '/__cypress/src/',
//           // scope: '/',
//         },
//       },
//       findWorker: (scriptURL) => scriptURL.includes(MSW_FILE),
//       onUnhandledRequest: (req) => {
//         if (!req.url.pathname.includes('__cypress') && !req.url.pathname.includes('static')) {
//           console.error('Unhandled Request:', req);
//           throw new Error('Unhandled Request');
//         }
//       },
//     })
//     .then(() => done());
// });

// afterEach(() => worker.resetHandlers());

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

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
