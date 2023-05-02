import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

  constructor(
    private _location: Location
  ) { }

  // Public methods
  public cancel() {
    this._location.back()
  }

  ngOnInit(): void {
  }

}
