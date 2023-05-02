import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { SignUpCredentials } from './../../models/interfaces';
import { AuthService } from './../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../../layout/auth-layout.component.scss', '../styles/styles.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  // Private
  private _unSubscribeAll: Subject<any> = new Subject<any>();

  // Public
  public formGroup = this._formBuilder.group({
    username: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    phoneNumber: [''],
    password: [''],
    re_password: [''],
  })

  public errors: string[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  // Public
  public submit() {
    const password = this.formGroup.get('password')!.value
    const re_password = this.formGroup.get('re_password')!.value

    if(password != re_password || !password || !re_password) {
      this.errors.push("Passwords doesnt match")
      return
    }

    this.errors.length = 0

    const data = this.formGroup.value as SignUpCredentials
    this._authService.signUp(data)
    .pipe(takeUntil(this._unSubscribeAll))
    .subscribe(res => {
      this._router.navigate([''])
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._unSubscribeAll.next(null)
    this._unSubscribeAll.complete()
  }

}
