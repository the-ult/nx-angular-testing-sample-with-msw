import { defineConfig } from 'cypress';
import { nxComponentTestingPreset } from '@nrwl/angular/plugins/component-testing';

export default defineConfig({
  // eslint-disable-next-line unicorn/prefer-module
  component: nxComponentTestingPreset(__filename),
});
