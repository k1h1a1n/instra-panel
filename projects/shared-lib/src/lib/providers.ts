import { InjectionToken } from '@angular/core';
import { AsyncDatabase } from './indexeddb/indexeddb.async';
import { IndexedDB } from './indexeddb/indexeddb.storage';

export const INDEXED_DATABASE = new InjectionToken<AsyncDatabase>('INDEXED_DB_CACHE_DATABASE');

export const SHARED_PROVIDERS = [
   {
      provide: INDEXED_DATABASE,
      useFactory: () => new AsyncDatabase(new IndexedDB('cache', 'InstraExpress'))
  }
];