import { Option } from './../../types/interfaces';
import { takeUntil } from 'rxjs';
import { MainService } from './../../services/main.service';
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { UserCard } from '../../types/interfaces';
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { cities } from 'src/assets/cities';

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.scss']
})
export class MyCardComponent implements OnInit, OnDestroy {

  @Input() data: UserCard | null = null
  @Output() onDelete = new EventEmitter<boolean>();
  @Output() onUpdate = new EventEmitter<boolean>();

  // Private
  private _unsubscribeAll: Subject<null> = new Subject<null>;

  // Public
  public formGroup = this._formBuilder.group({
    weight: [this.data?.weight],
    transportType: [this.data?.transport],
    cardType: [this.data?.type],
    cityFrom: [this.data?.cityFrom],
    cityTo: [this.data?.cityTo],
    arrivingTime: [this.data?.arrivingTime]
  })
  public isEdit: boolean = false;
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
    private _mainService: MainService
  ) { }

  // Public
  public submit() {
    const arrivingTime = this.formGroup.get('arrivingTime')!.value
    const data = {
      id: this.data?.id,
      ...this.formGroup.value,
      arrivingTime
    }

    this._mainService.updateUserCard(data)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(res => {
      this.onUpdate.emit(true)
      this.toggleEdit()
    },
    res => {
      this.onUpdate.emit(true)
      this.toggleEdit()
    })
  }

  public toggleEdit() {
    this.isEdit = !this.isEdit
  }

  public deleteCard() {
    this._mainService.deleteUserCard(this.data!.id!)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(res => {
      this.onDelete.emit(true)
    },
    res => {
      this.onDelete.emit(true)
    })

  }

  // Private
  private _initFormGroupValues() {
    this.formGroup.get('weight')?.setValue(this.data?.weight)
    this.formGroup.get('transportType')?.setValue(this.data?.transport)
    this.formGroup.get('cardType')?.setValue(this.data?.type)
    this.formGroup.get('cityFrom')?.setValue(this.data?.cityFrom)
    this.formGroup.get('cityTo')?.setValue(this.data?.cityTo)
    this.formGroup.get('arrivingTime')?.setValue(this.data?.arrivingTime)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this._initFormGroupValues()
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }
}
