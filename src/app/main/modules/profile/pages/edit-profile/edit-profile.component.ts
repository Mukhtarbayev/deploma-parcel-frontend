import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

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
