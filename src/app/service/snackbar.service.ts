import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(msg: string, duration: number) {
    this.snackBar.open(msg, null, {duration});
  }
  openSnackBarExtraClass(msg: string, duration: number, extraClasses: string[]) {
    this.snackBar.open(msg, null, {duration, extraClasses});
  }
}
