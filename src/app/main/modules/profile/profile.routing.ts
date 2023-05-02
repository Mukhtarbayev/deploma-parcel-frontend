import { ProfileComponent } from './pages/profile/profile.component';
import { Routes } from "@angular/router";
import { EditPasswordComponent } from "./pages/edit-password/edit-password.component";
import { ProfileLayoutComponent } from "./profile-layout.component";
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

export const profileRouting: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent,
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'edit-password',
        component: EditPasswordComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
    ]
  },
]
