import { cities } from './../../../../assets/cities';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { MainService } from './../../services/main.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Option, UserCard } from '../../types';

@Component({
  selector: 'app-for-transmitting',
  templateUrl: './for-transmitting.component.html',
  styleUrls: ['./for-transmitting.component.scss']
})
export class ForTransmittingComponent implements OnInit, OnDestroy {

  // Private
  private _unsubscribeAll: Subject<null> = new Subject<null>;

  public fromCity: string | null = null
  public toCity: string | null = null

  public cities: Option[] = cities

  public userCards: UserCard[] | null = null

  constructor(
    private _mainService: MainService
  ) { }

  private _initCards() {
    this._mainService.getTransmittingCards()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(res => {
      this.userCards = res
    })
  }

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
