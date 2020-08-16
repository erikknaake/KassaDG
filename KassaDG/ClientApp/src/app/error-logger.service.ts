import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Clipboard} from "ts-clipboard";

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggerService {

  constructor(private _snackBar: MatSnackBar) { }

  log(error: Error): void {
    console.log(error);
    this.openSnackBar(`Er vond een error plaats: ${error.name}`, 'Copy error', error);
  }

  private openSnackBar(message: string, action: string, error: Error) {
    this._snackBar.open(message,action, {
    }).afterDismissed().subscribe(next => {
      Clipboard.copy(`Error: ${error.name}\nMessage: ${error.message}`);
    });
  }
}
