import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { UserCard } from '../../types';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() public data: UserCard | null = null

  constructor(
    private _dialog: MatDialog
  ) { }

  public openDialog(userData: UserCard) {
    const dialogRef = this._dialog.open(UserDialogComponent, {
      data: userData,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit(): void {
  }

}
