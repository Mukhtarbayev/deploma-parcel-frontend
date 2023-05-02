import { JwtInterceptor } from './auth/helpers/jwt.interceptor';
import { appRouting } from './app.routing';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouting),
    NoopAnimationsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}]
})
export class AppModule { }
