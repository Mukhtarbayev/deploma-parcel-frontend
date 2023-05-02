import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { EmailRecoveryComponent } from './pages/email-recovery/email-recovery.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';

export const authRouting: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-up',
        pathMatch: 'full'
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'email-recovery',
        component: EmailRecoveryComponent
      },
      {
        path: 'password-recovery',
        component: PasswordRecoveryComponent
      },
    ],
  },
];
