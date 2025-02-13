// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace Cypress {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface
	interface Chainable<Subject> {}
}

import type { DefaultBodyType } from 'msw';
import { HttpResponse } from 'msw';

/**
 * Reset the msw mock server
 *
 */
export const mswResetWorkerHandlers = () => {
	Cypress.log({
		name: 'mswResetWorker',
		displayName: '🔐  RESET THE MSW WORKERS',
		autoEnd: true,
	});

	cy.window().then((window) => {
		const { worker } = window.msw;
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
 * @see: [MSWjs - One-time override](https://mswjs.io/docs/api/setup-worker/use#one-time-override)
 *
 * @param handlers
 */

// ! FIXME improve make dynamic
// ! add/use the MSW generics
// ! Check graphql generator
// ! Check errors
export const mswMock = (url: string, data: DefaultBodyType): void => {
	if (Cypress.env('apiMocking') === 'true') {
		Cypress.log({
			name: 'mswMock',
			displayName: '🔐  MOCK THE MSW WORKERS for given handlers',
			autoEnd: true,
		});

		cy.window().then((win) => {
			// Reference global instances set in "src/mocks.js".
			const { http, worker } = win.msw;

			// worker.use(http.get(url, () => HttpResponse.json(data)));
			worker.use(http.get(url, () => HttpResponse.json(data)));
		});
	} else {
		// eslint-disable-next-line no-console, no-restricted-syntax
		console.info('🛑 !! MOCK ENV is not enabled !!');
	}
};

// export const mswMock = (handlers: RequestHandler[]): void => {
//   if (Cypress.env('mock') === 'true') {
//     Cypress.log({
//       name: 'mswMock',
//       displayName: '🔐  MOCK THE MSW WORKERS for given handlers',
//       autoEnd: true,
//     });
//     cy.window().then((win) => {
//       const { worker } = win.msw;

//       worker.use(...handlers);
//     });
//   }
// };
