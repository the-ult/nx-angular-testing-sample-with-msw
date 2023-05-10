import { nxComponentTestingPreset } from '@nrwl/angular/plugins/component-testing';
import { defineConfig } from 'cypress';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  component: {
    ...nxComponentTestingPreset(fileURLToPath(import.meta.url)),
  },
});
