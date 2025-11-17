import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ListingApp } from './app/app';

bootstrapApplication(ListingApp, appConfig)
  .catch((err) => console.error(err));
