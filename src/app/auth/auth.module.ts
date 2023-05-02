import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './layout/auth-layout.component';
import { authRouting } from './auth.routing';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { EmailRecoveryComponent } from './pages/email-recovery/email-recovery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    SignUpComponent,
    LoginComponent,
    PasswordRecoveryComponent,
    EmailRecoveryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(authRouting)
  ]
})
export class AuthModule { }
