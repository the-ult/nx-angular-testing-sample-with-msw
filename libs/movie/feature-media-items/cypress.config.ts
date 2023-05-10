import { nxComponentTestingPreset } from '@nrwl/angular/plugins/component-testing';
import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    // eslint-disable-next-line unicorn/prefer-module
    ...nxComponentTestingPreset(__filename),
  },
});
