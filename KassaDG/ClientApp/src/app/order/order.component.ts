import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IAccount} from "../../IAccount";
import {ErrorLoggerService} from "../error-logger.service";
import {BasketService, IOrderAmount} from "../basket.service";
import {MoneyFormatter} from "../../MoneyFormatter";
import {CommitingOrderService} from "../commiting-order.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confim-dialog/confirm-dialog.component";
import {NegativeCreditsDialogComponent} from "../negative-credits-dialog/negative-credits-dialog.component";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  account: IAccount = null;
  basketContents: IOrderAmount[] = [];
  deposit: number;

  private dialogRef: MatDialogRef<NegativeCreditsDialogComponent>;

  constructor(
    private readonly http: HttpClient,
    @Inject("BASE_URL") private readonly baseUrl: string,
    private readonly route: ActivatedRoute,
    private readonly errorLogger: ErrorLoggerService,
    private readonly basket: BasketService,
    private readonly router: Router,
    private readonly commitingOrder: CommitingOrderService,
    private readonly dialog: MatDialog) {
  }

  ngOnInit() {
    this.router.events.subscribe(next => {
      if(next instanceof ActivationEnd) {
        this.basket.clear();
      }
    });
    this.basket.subscribe((newBasket: IOrderAmount[]) => {
      this.onBasketChanged(newBasket);
    });

    this.route.params.subscribe(params => {
      this.fetchAccount(params['accountId']);
    })
  }

  private fetchAccount(id: number) {
    this.http.get<IAccount>(this.baseUrl + 'account/' + id).subscribe(next => {
      this.account = next;
      if(this.account.balanceCents < 0) {
        this.warnNegativeCredits();
      }
    }, error => {
      this.errorLogger.log(error)
    });
  }

  private warnNegativeCredits() {
    this.dialogRef = this.dialog.open(NegativeCreditsDialogComponent, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      if(!result) {
        this.commitingOrder.isCommitingOrder = true;
        this.router.navigateByUrl('/accounts').then(() => {
          this.commitingOrder.isCommitingOrder = false;
        });
      }
    });
  }

  private onBasketChanged(newBasket: IOrderAmount[]) {
    this.basketContents = newBasket;
  }

  calculateSubTotal(basketContentLine: IOrderAmount) {
    return MoneyFormatter.format(basketContentLine.pricePerPiece * basketContentLine.amount);
  }

  calculateTotal(): string {
    return MoneyFormatter.format(this.basketContents
      .map(x => x.amount * x.pricePerPiece)
      .reduce((prev, cur) => prev + cur, 0)
    );
  }

  formatMoney(pricePerPieceCents: number): string {
    return MoneyFormatter.format(pricePerPieceCents);
  }

  navigateAccounts() {
    this.router.navigateByUrl('/accounts');
  }

  order() {
    const order: IOrderPost[] = this.basketContents.map(x => {
      return {
        id: x.productId,
        amount: x.amount
      }
    });
    const finalOrder: IFinalOrder = {
      orderCommandLines: order,
      accountId: this.account.id,
      deposit: MoneyFormatter.toCents(this.deposit)
    }
    this.http.post(this.baseUrl + 'order', finalOrder).subscribe(next => {
      this.commitingOrder.isCommitingOrder = true;
      this.router.navigateByUrl('/accounts').then(() => {
        this.commitingOrder.isCommitingOrder = false;
      });
      this.basket.clear();
    }, error => {
      this.errorLogger.log(error);
    });
  }

  removeProductFromBasket(productId: number) {
    this.basket.removeProduct(productId);
  }
}

interface IOrderPost {
  id: number;
  amount: number;
}

interface IFinalOrder {
  orderCommandLines : IOrderPost[];
  accountId: number;
  deposit?: number;
}
