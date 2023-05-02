import { LoginResponse, SignUpCredentials, SignUpResponse } from './../models/interfaces';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginCredentials} from "../models/interfaces";
import { BehaviorSubject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Public
  public isAuthorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.check())
  constructor(
    private _http: HttpClient
  ) { }

  // Public
  public login(data: LoginCredentials) {
    return this._http.post<LoginResponse>(environment.api + '/auth/login', data)
    .pipe(tap((res) => {
      this._loginHandler(res.token, res.id)
      this.isAuthorized.next(true)
    }))
  }

  public logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    this.isAuthorized.next(false)
  }

  public signUp(data: SignUpCredentials) {
    return this._http.post<SignUpResponse>(environment.api + '/auth/register', data)
    .pipe(tap((res) => {
      this._signUpHandler(res.token, res.id)
      this.isAuthorized.next(true)
    }))
  }

  public check() {
    if(localStorage.getItem('accessToken')) return true
    return false
  }
  // Private
  private _loginHandler(accessToken: string, id: number) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('userId', id.toString())
  }

  private _signUpHandler(accessToken: string, id: number) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('userId', id.toString())
  }

}
