// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentBase } from '@ult/shared/data-access';
import { primitiveToBoolean } from '@ult/shared/utils';

export const environment: EnvironmentBase = {
  production: false,
  environment: 'dev',
  apiMocking: primitiveToBoolean(process.env['NX_MSW_API_MOCKING']),

  url: {
    api: process.env['NX_API_URL'] ?? 'API_URL_NOT_DEFINED',
    img: process.env['NX_IMG_URL'] ?? 'IMG_URL_NOT_DEFINED',
  },
  bearer: process.env['NX_TMDB_BEARER'],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
