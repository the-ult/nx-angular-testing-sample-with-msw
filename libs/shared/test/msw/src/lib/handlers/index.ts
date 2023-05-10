import { RequestHandler } from 'msw';
import { MOVIE_HANDLERS } from './movie.handlers';

/**
 * Add new handlers here, so we can easily add new handlers to the browser and server
 */
export const HANDLERS: RequestHandler[] = [
  ...MOVIE_HANDLERS,
  /// add other handlers
];

export { MOVIE_HANDLERS } from './movie.handlers';
