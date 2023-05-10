export type EnvironmentType = 'local' | 'e2e' | 'prd' | 'dev' | 'acc' | 'tst';

export interface EnvironmentBase {
  production: boolean;
  baseUrl: string;
  appName?: string;
  environment: EnvironmentType;
  mock: boolean;
}
