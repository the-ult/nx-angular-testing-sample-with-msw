import { InjectionToken } from '@angular/core';
import type { EnvironmentBase } from './environment.model';

export const ENVIRONMENT = new InjectionToken<EnvironmentBase>('Environment');
