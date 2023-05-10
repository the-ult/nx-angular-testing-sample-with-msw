import { InjectionToken } from '@angular/core';
import { EnvironmentBase } from './environment.model';

export const ENVIRONMENT = new InjectionToken<EnvironmentBase>('Environment');
