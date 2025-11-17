import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { SyncApp } from './app/app';

bootstrapApplication(SyncApp, appConfig)
  .catch((err) => console.error(err));
