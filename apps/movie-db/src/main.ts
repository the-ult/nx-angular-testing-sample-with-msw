import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';

import { enableProdMode } from '@angular/core';
import { AppRoot } from './app/app.root';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppRoot, appConfig).catch((error) => {
  console.error(error);
});
