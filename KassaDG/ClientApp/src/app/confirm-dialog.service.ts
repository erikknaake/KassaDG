import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./confim-dialog/confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  private dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(private readonly dialog: MatDialog) { }

  /**
   * Opens a dialog
   * @param message - message to display
   * @return promise that resolves after dialog is closed, contains true on confirmation, false otherwise
   */
  public async confirmDialog(message: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: false
      });

      this.dialogRef.componentInstance.confirmMessage = message;

      this.dialogRef.afterClosed().subscribe(result => {
        this.dialogRef = null;
        resolve(result);
      });
    });
  }
}
