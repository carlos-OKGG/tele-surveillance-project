import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard]
  },
  
  {
    path: '**',
    redirectTo: ''
  }
];
