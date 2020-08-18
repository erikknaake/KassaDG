import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-negative-credits-dialog',
  templateUrl: './negative-credits-dialog.component.html',
  styleUrls: ['./negative-credits-dialog.component.css']
})
export class NegativeCreditsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NegativeCreditsDialogComponent>) { }

  ngOnInit() {
  }

}
