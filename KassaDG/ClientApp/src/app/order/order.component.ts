import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IAccount} from "../../IAccount";
import {ErrorLoggerService} from "../error-logger.service";
import {BasketService, IOrderAmount} from "../basket.service";
import {MoneyFormatter} from "../../MoneyFormatter";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private account: IAccount;
  basketContents: IOrderAmount[] = [];

  constructor(
    private readonly http: HttpClient,
    @Inject("BASE_URL") private readonly baseUrl: string,
    private readonly route: ActivatedRoute,
    private readonly errorLogger: ErrorLoggerService,
    private readonly basket: BasketService) {
  }

  ngOnInit() {
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
    }, error => {
      this.errorLogger.log(error)
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
}
