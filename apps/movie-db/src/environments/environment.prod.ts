import { EnvironmentBase } from '@ult/shared/data-access';

export const environment: EnvironmentBase = {
  production: true,
  environment: 'prd',
  apiMocking: false,
  url: {
    api: process?.env['NX_API_URL'] ?? 'API_URL_NOT_DEFINED',
    img: process?.env['NX_IMG_URL'] ?? 'IMG_URL_NOT_DEFINED',
  },
  bearer: process?.env['NX_BEARER'],
};
