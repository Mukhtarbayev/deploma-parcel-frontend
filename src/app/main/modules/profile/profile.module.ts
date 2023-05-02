import { ProfileLayoutComponent } from './profile-layout.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { profileRouting } from './profile.routing';
import { EditPasswordComponent } from './pages/edit-password/edit-password.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ProfileComponent } from './pages/profile/profile.component';



@NgModule({
  declarations: [
    ProfileLayoutComponent,
    ProfileComponent,
    EditProfileComponent,
    EditPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(profileRouting)
  ]
})
export class ProfileModule { }
