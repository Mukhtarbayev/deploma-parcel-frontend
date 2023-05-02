import { cities } from './../../../../assets/cities';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { Option, UserCard } from './../../types/interfaces';
import { MainService } from './../../services/main.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-for-departing',
  templateUrl: './for-departing.component.html',
  styleUrls: ['./for-departing.component.scss']
})
export class ForDepartingComponent implements OnInit, OnDestroy {

  // Private
  private _unsubscribeAll: Subject<null> = new Subject<null>;

  // Public
  public fromCity: string | null = null
  public toCity: string | null = null

  public cities: Option[] = cities

  public userCards: UserCard[] | null = null

  constructor(
    private _mainService: MainService,
  ) { }

  // Private
  private _initCards() {
    this._mainService.getDepartingCards()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(res => {
      this.userCards = res
    })
  }

  // Public
  public filterCards() {
    const filterData: any = {
      from: this.fromCity,
      to: this.toCity
    }
    this._mainService.filterCards(filterData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(res => {
      this.userCards = res as UserCard[]
    })
  }

  public resetFilter() {
    this.fromCity = null
    this.toCity = null
    this._initCards()
  }

  ngOnInit(): void {
    this._initCards()
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }

}
