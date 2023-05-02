import { AuthService } from './../../../auth/services/auth.service';
import { CreateCardComponent } from './../../common/create-card/create-card.component';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil, BehaviorSubject } from 'rxjs';
import { MainService } from './../../services/main.service';
import { Subject } from 'rxjs';
import { UserCard } from '../../types/interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.scss']
})
export class MyCardsComponent implements OnInit, OnDestroy {

  // Private
  private _unsubscribeAll: Subject<null> = new Subject<null>;

  // Public
  public myCards: UserCard[] | null = null
  public isAuthorized: BehaviorSubject<boolean> | null= null

  constructor(
    private _mainService: MainService,
    private _dialog: MatDialog,
    private _authService: AuthService
  ) { }

  // Private
  private _initCards() {
    const userId = localStorage.getItem('userId')
    this._mainService.getAllCards(+userId!)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(res => {
      this.myCards = res
    })
  }

// Public

  public openDialog() {
    const dialogRef = this._dialog.open(CreateCardComponent);
    dialogRef.componentInstance.onCreate
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(res => {
      this.updateCardList()
    })
  }

  public updateCardList() {
    this._initCards()
  }

  ngOnInit(): void {
    this._initCards()
    this.isAuthorized = this._authService.isAuthorized
  }

  ngOnDestroy(): void {
      this._unsubscribeAll.next(null)
      this._unsubscribeAll.complete()
  }

}
