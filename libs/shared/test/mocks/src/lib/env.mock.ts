import { EnvironmentBase } from '@ult/shared/data-access';

export const ENV_MOCK: EnvironmentBase = {
  production: false,
  baseUrl: 'http://localhost:4200',

  environment: 'tst',
  appName: 'TEST',

  apiMocking: true,

  url: {
    api: 'http://localhost:4200',
    img: 'http://localhost:4200',
  },
  bearer: 'BEARER NOT DEFINED',
};
