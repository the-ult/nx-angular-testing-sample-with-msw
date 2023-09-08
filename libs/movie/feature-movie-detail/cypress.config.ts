import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';
import { defineConfig } from 'cypress';

export default defineConfig({
  // eslint-disable-next-line unicorn/prefer-module
  component: nxComponentTestingPreset(__filename),
});
