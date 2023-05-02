import { BehaviorSubject } from 'rxjs';
import { AuthService } from './../../../auth/services/auth.service';
import { NavItem } from './types/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public navItems: NavItem[] = [
    {
      label: 'For Transmitting',
      link: 'for-transmitting'
    },
    {
      label: 'For Departing',
      link: 'for-departing'
    }
  ]

  public isAuthorized: BehaviorSubject<boolean> | null = null

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAuthorized = this._authService.isAuthorized
  }

  ngAfterViewChecked(): void {
  }

}
