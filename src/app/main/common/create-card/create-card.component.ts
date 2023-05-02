import { MatDialogRef } from '@angular/material/dialog';
import { catchError, takeUntil } from 'rxjs';
import { CreateUserCard, Option } from './../../types/interfaces';
import { Subject } from 'rxjs';
import { MainService } from './../../services/main.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { cities } from 'src/assets/cities';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit, OnDestroy {

  @Output() onCreate = new EventEmitter<boolean>();

  // Private
  private _unsubscribeAll: Subject<null> = new Subject<null>;

  // Public
  public formGroup = this._formBuilder.group({
    weight: [''],
    transportType: ['AIRPLANE'],
    cardType: ['DEPARTING'],
    cityFrom: [''],
    cityTo: [''],
    arrivingTime: ['']
  })
  public cities: Option[] = cities
  public cardTypeOptions: Option[] = [
    {
      value: 'DEPARTING',
      label: 'Departing'
    },
    {
      value: 'TRANSMITTING',
      label: 'Transmitting'
    },
  ]
  public transportOptions: Option[] = [
    {
      value: 'AIRPLANE',
      label: 'Airplane'
    },
    {
      value: 'TRAIN',
      label: 'Train'
    },
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private _mainService: MainService,
    private _dialogRef: MatDialogRef<CreateCardComponent>
  ) { }

  public submit() {
    const userId = +localStorage.getItem('userId')!
    const arrivingTime = this.formGroup.get('arrivingTime')!.value + ':00'
    const data = {
      userId,
      ...this.formGroup.value,
      arrivingTime
    }

    this._mainService.createUserCard(data)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(res => {
      this.onCreate.emit(true)
      this._dialogRef.close()
    },
    res => {
      this.onCreate.emit(true)
      this._dialogRef.close()
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }

}
