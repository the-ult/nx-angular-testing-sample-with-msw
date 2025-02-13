import { setupServer } from 'msw/node';
import { HANDLERS } from '../handlers';

const mswServer = setupServer(...HANDLERS);

// export { HttpResponse, rest } from 'msw';
export { http } from 'msw';
export { mswServer };
