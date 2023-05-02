import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoginCredentials} from "../../models/interfaces";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../layout/auth-layout.component.scss', '../styles/styles.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // Private
  private _unSubscribeAll: Subject<any> = new Subject<any>();

  // Public
  public formGroup = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) { }

  public submit() {
    const data: LoginCredentials = this.formGroup.value as LoginCredentials
    this._authService.login(data)
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
