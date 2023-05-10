/* eslint-disable unicorn/no-await-expression-member */
import { Route } from '@angular/router';

export const MOVIE_DB_ROUTES: Route[] = [
  {
    path: 'movies',
    loadComponent: async () => (await import('@ult/movie/feature-movies')).MoviesPage,
  },
  {
    path: 'movies/:movieId',
    loadComponent: async () => (await import('@ult/movie/feature-movie-detail')).MovieDetailPage,
  },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
