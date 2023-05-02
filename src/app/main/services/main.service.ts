import { AuthService } from './../../auth/services/auth.service';
import { UserCard, CreateUserCard, CardsFilter } from './../types/interfaces';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) { }


  public getAllCards(userId: number): Observable<UserCard[]>  {
    return this._http.get<UserCard[]>(environment.api + '/cards/getCardsByUserId/' + userId);
  }

  public getDepartingCards(): Observable<UserCard[]>  {
    return this._http.get<UserCard[]>(environment.api + '/cards/getForDeparting')
  }

  public getTransmittingCards(): Observable<UserCard[]> {
    return this._http.get<UserCard[]>(environment.api + '/cards/getForTransmitting')
  }

  public createUserCard(data: any) {
    return this._http.post(environment.api + '/cards/create', data)
  }

  public updateUserCard(data: any) {
    return this._http.post(environment.api + '/cards/update', data)
  }

  public deleteUserCard(cardId: number) {
    return this._http.post(environment.api + '/cards/delete/' + cardId, {})
  }

  public getCities() {
    return this._http.get(environment.api + '/cards/getCities')
  }

  public filterCards(data: CardsFilter) {
    return this._http.post(environment.api + '/cards/filter', data)
  }

  public getUser(userId: number) {
    return this._http.get(environment.api + '/users/get/' + userId)
  }

}
