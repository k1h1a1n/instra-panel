import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Login - NO HEADER, NO SIDEBAR
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login/login').then(m => m.Login)
    },

    // Home layout (with header & sidebar)
    {
        path: 'home',
        loadComponent: () =>
            import('./layout/home/home').then(m => m.Home),
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },

            // MICROFRONTENDS UNDER HOME
            {
                path: 'sync',
                loadComponent: () =>
                    loadRemoteModule('sync', './Component').then(m => m.SyncApp)
            },
            {
                path: 'listing',
                loadComponent: () =>
                    loadRemoteModule('listing', './Component').then(m => m.ListingApp)
            }
        ]
    },

    // fallback
    { path: '**', redirectTo: 'login' }
];

