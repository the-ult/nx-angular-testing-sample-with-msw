// import 'whatwg-fetch';
import { mswServer } from './server';

// Enable the mocking in tests.

beforeAll(() => {
	mswServer.listen({ onUnhandledRequest: 'error' });
	console.log(mswServer.listHandlers());
});

// Reset any runtime handlers tests may use.
afterEach(() => {
	mswServer.resetHandlers();
});

// Clean up once the tests are done.
afterAll(() => {
	mswServer.close();
});

// export { HttpResponse, mswServer, rest } from './server';
export { http, mswServer } from './server';
