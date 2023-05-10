import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

import * as dotenv from 'dotenv';
dotenv.config({ override: true, path: '.env.e2e' });

export default defineConfig({
  e2e: {
    // eslint-disable-next-line unicorn/prefer-module
    ...nxE2EPreset(__dirname),
    experimentalRunAllSpecs: true,
    viewportHeight: 1050,
    viewportWidth: 1650,
    env: {
      apiMocking: process.env['NX_MSW_API_MOCKING'],
    },
  },
});
