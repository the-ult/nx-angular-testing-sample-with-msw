/* eslint-disable unicorn/prefer-module */
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

const { MOCK } = process.env;

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    viewportHeight: 1050,
    viewportWidth: 1650,
    env: {
      mock: MOCK ?? false,
    },
  },
});
