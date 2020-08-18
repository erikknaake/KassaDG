import {Component, Inject, Input, OnInit} from '@angular/core';
import {IOrder, IOrderLine} from "../../../IOrder";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ErrorLoggerService} from "../../error-logger.service";
import {IAccount} from "../../../IAccount";
import {MoneyFormatter} from "../../../MoneyFormatter";

@Component({
  selector: 'app-order-history-item',
  templateUrl: './order-history-item.component.html',
  styleUrls: ['./order-history-item.component.css']
})
export class OrderHistoryItemComponent implements OnInit {

  order: IOrder;

  constructor(private readonly route: ActivatedRoute,
              private readonly http: HttpClient,
              @Inject("BASE_URL") private readonly baseUrl: string,
              private readonly errorLogger: ErrorLoggerService,) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fetchOrder(params['orderId']);
    });
  }


  private fetchOrder(orderId: number) {
    this.http.get<IOrder>(this.baseUrl + 'order/' + orderId).subscribe(next => {
      this.order = next;
    }, error => {
      this.errorLogger.log(error);
    });

  }

  calculateTotal(): string {
    return MoneyFormatter.format(
      this.order.orderLines
        .map(this.calculateSubTotal)
        .reduce((prev, cur) => prev + cur)
      - this.order.deposit
    );
  }

  getSubTotal(orderLine: IOrderLine): string {
    return MoneyFormatter.format(this.calculateSubTotal(orderLine));
  }

  calculateSubTotal(orderLine: IOrderLine): number {
    return orderLine.amount * orderLine.productPriceCents;
  }

  formatMoney(cents: number): string {
    return MoneyFormatter.format(cents);
  }
}
