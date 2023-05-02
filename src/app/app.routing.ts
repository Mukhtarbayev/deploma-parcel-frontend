import { NoAuthGuard } from './auth/helpers/no-auth.guard';
import { AuthGuard } from './auth/helpers/auth.guard';
import { Routes } from '@angular/router';

export const appRouting: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    // canActivateChild: [NoAuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // canActivateChild: [AuthGuard]
  },
];
