import { TrackByFunction } from '@angular/core';

/**
 * Easily create a typeSafe `trackBy` Function for your Angular `*ngFor`
 *
 * @example
 * ```ts
 * readonly trackByMovieId = trackByProp<Movie('id');
 * ```
 *
 * ```html
 * <li  *ngFor="let movie of popularMovies$ | async; trackBy: trackByMovieId">
 *   {{ movie.title }}
 * </li>
 * ```
 *
 * @param property
 * @returns TrackByFunction
 */
export const trackByProp: <T>(property: keyof T) => TrackByFunction<T> =
  <T>(property: keyof T) =>
  (_: number, item: T) =>
    item[property];
