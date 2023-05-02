import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { mainRouting } from './main.routing';
import { ForTransmittingComponent } from './pages/for-transmitting/for-transmitting.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCardComponent } from './common/user-card/user-card.component';
import { MyCardsComponent } from './pages/my-cards/my-cards.component';
import { ForDepartingComponent } from './pages/for-departing/for-departing.component';
import { MyCardComponent } from './common/my-card/my-card.component';
import { UserDialogComponent } from './common/user-dialog/user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateCardComponent } from './common/create-card/create-card.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    ForTransmittingComponent,
    UserCardComponent,
    MyCardsComponent,
    ForDepartingComponent,
    MyCardComponent,
    UserDialogComponent,
    CreateCardComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(mainRouting),
    NgSelectModule,
    MatDialogModule
  ]
})
export class MainModule { }
