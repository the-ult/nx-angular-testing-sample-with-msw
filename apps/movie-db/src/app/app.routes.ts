/* eslint-disable unicorn/no-await-expression-member */
import { Route } from '@angular/router';
import { RouteType } from '@ult/shared/data-access';

interface MovieRoute extends Route {
  data?: {
    mediaType: RouteType;
  };
}

// TODO: move media/movies routes to libs/movie/???
export const MOVIE_DB_ROUTES: MovieRoute[] = [
  {
    path: 'movies',
    loadComponent: async () => (await import('@ult/movie/feature-media-items')).MediaItemsPage,
    data: {
      mediaType: 'movies',
    },
  },
  {
    path: 'movies/:movieId',
    loadComponent: async () => (await import('@ult/movie/feature-movie-detail')).MovieDetailPage,
  },
  {
    path: 'tv-shows',
    loadComponent: async () => (await import('@ult/movie/feature-media-items')).MediaItemsPage,
    data: {
      mediaType: 'tvShows',
    },
  },
  {
    path: 'tv-shows/:tvShowId',
    loadComponent: async () => (await import('@ult/movie/feature-movie-detail')).MovieDetailPage,
  },
  {
    path: '',
    loadComponent: async () => (await import('@ult/movie/feature-shell')).MovieFeatureShellPage,

    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];
