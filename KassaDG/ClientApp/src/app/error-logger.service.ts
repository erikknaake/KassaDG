import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Clipboard} from "ts-clipboard";

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggerService {

  constructor(private _snackBar: MatSnackBar) {
  }

  log(error: Error): void {
    console.log(error);
    this.openSnackBarWithCopyAction(`Er vond een error plaats: ${error.name}`, 'Copy error', error);
  }

  private openSnackBarWithCopyAction(message: string, action: string, error: Error) {
    this.openSnackbar(message, action).afterDismissed().subscribe(() => {
      let errorString: string = `Error: ${error.name}\nMessage: ${error.message}`;
      const innerError: string = (<any>error).error
      if (innerError != null) {
        errorString += `\nInnerError: ${innerError}`;
      }
      Clipboard.copy(errorString);
    });
  }

  public openSnackbar(message: string, action: string) {
    return this._snackBar.open(message, action, {})
  }
}
