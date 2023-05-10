import type { EnvironmentBase } from '@ult/shared/data-access';

export const ENV_MOCK: EnvironmentBase = {
  production: false,
  baseUrl: 'http://localhost:4200',

  environment: 'tst',
  appName: 'TEST',

  apiMocking: true,

  url: {
    api: 'http://localhost:4200',
    img: 'https://image.tmdb.org/t/p/w220_and_h330_face',
  },
  bearer: 'BEARER NOT DEFINED',
};
