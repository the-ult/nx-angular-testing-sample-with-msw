import type { RequestHandler } from 'msw';
import { MOVIE_HANDLERS } from './movie.handler';
import { TV_SHOW_HANDLERS } from './tv-show.handler';

/**
 * Add new handlers here, so we can easily add new handlers to the browser and server
 */
export const HANDLERS: RequestHandler[] = [
  ...MOVIE_HANDLERS,
  ...TV_SHOW_HANDLERS,
  /// add other handlers
];

export { MOVIE_HANDLERS } from './movie.handler';
