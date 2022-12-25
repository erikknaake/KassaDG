import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BasketService, IOrderAmount} from "../basket.service";
import {CommitingOrderService} from "../commiting-order.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NegativeCreditsDialogComponent} from "../../dialogs/negative-credits-dialog/negative-credits-dialog.component";
import {ErrorLoggerService} from "../../error-logger.service";
import {IAccount} from "../../../IAccount";
import {MoneyFormatter} from "../../../MoneyFormatter";
import {IProduct} from "../../../IProduct";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  ngOnInit(): void {
  }

}
