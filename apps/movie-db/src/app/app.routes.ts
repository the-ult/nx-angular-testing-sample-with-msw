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
      mediaType: 'movie',
    },
  },
  {
    path: 'movie/:movieId',
    loadComponent: async () => (await import('@ult/movie/feature-movie-detail')).MovieDetailPage,
  },
  {
    path: 'tv-shows',
    loadComponent: async () => (await import('@ult/movie/feature-media-items')).MediaItemsPage,
    data: {
      mediaType: 'tv',
    },
  },
  // {
  //   path: 'tv/:tvId',
  //   loadComponent: async () =>
  //     (await import('@ult/movie/feature-movie-detail')).MediaItemDetailPage,
  // },
  {
    path: '',
    loadComponent: async () => (await import('@ult/movie/feature-shell')).MovieFeatureShellPage,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];
