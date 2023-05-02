import { MainPageComponent } from './pages/main-page/main-page.component';
import { ForDepartingComponent } from './pages/for-departing/for-departing.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { Routes } from "@angular/router";
import { ForTransmittingComponent } from './pages/for-transmitting/for-transmitting.component';
import { MyCardsComponent } from './pages/my-cards/my-cards.component';

export const mainRouting: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '', component: MainPageComponent
      },
      {
        path: 'for-transmitting', component: ForTransmittingComponent
      },
      {
        path: 'for-departing', component: ForDepartingComponent
      },
      {
        path: 'my-cards', component: MyCardsComponent
      },
      {
        path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  }
]
