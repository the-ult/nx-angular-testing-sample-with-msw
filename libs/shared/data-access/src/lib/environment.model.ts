export type EnvironmentType = 'local' | 'e2e' | 'prd' | 'dev' | 'acc' | 'tst';

// !FIXME => use t3/env or Zod for type safety
export interface EnvironmentBase {
	[x: string]: unknown;
	production: boolean;
	appName?: string;
	environment: EnvironmentType;
	apiMocking: boolean;

	// !FIXME: move to separate EnvironmentMovie
	bearer?: string;
	url: {
		// base: string;
		api: string;
		img: string;
	};
}
