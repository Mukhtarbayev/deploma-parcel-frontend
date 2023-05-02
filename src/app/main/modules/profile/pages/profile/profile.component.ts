import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { MainService } from './../../../../services/main.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserData } from '../../types/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
// Private
  private _userId: string | null = localStorage.getItem('userId')
  private _unsubscribeAll: Subject<null> = new Subject<null>;

// Public
  public userData: UserData | null = null

  public logout() {
    this._authService.logout()
    this._router.navigate(['/'])
  }

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _mainService: MainService
  ) { }

  private _initUserData() {
    this._mainService.getUser(+this._userId!)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(res => {
      this.userData = res as UserData
    })
  }

  ngOnInit(): void {
    this._initUserData()
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }
}
