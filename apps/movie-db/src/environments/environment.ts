// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * Start the MSW service worker
 * Since we only add it to our development environment, it is only started here
 *
 * @see: /libs/shared/test/msw/README.md
 */
import { EnvironmentBase } from '@ult/shared/data-access';

export const environment: EnvironmentBase = {
  production: false,
  baseUrl: 'https://api.themoviedb.org/3',
  environment: 'dev',
  mock: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
