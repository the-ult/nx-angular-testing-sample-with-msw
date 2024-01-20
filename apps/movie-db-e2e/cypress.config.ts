import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	e2e: {
		// eslint-disable-next-line unicorn/prefer-module
		...nxE2EPreset(__dirname),
		experimentalRunAllSpecs: true,
		viewportHeight: 1050,
		viewportWidth: 1650,
		setupNodeEvents(_on, config) {
			config.env['apiMocking'] = process.env['NX_MSW_API_MOCKING'];

			return config;
		},
		testIsolation: true,
	},
});
