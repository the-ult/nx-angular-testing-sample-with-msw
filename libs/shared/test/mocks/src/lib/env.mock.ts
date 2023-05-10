import { EnvironmentBase } from '@ult/shared/data-access';

export const ENV_MOCK: EnvironmentBase = {
  production: false,
  baseUrl: 'https://localhost:4200',

  environment: 'tst',
  appName: 'TEST',

  apiMocking: true,

  url: {
    api: 'https://localhost:4200',
    img: 'https://localhost:4200',
  },
  bearer: 'BEARER NOT DEFINED',
};
