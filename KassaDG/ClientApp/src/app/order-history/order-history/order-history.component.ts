import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IAccount} from "../../../IAccount";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ErrorLoggerService} from "../../error-logger.service";
import {IOrder, IOrderLine} from "../../../IOrder";
import {MoneyFormatter} from "../../../MoneyFormatter";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  account: IAccount;
  orders: IOrder[] = [];
  totalHistoryItems: number;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(private readonly route: ActivatedRoute,
              private readonly http: HttpClient,
              @Inject("BASE_URL") private readonly baseUrl: string,
              private readonly errorLogger: ErrorLoggerService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fetchAccount(params['accountId']);
      this.fetchOrders(params['accountId']);
    });
  }

  fetchAccount(accountId: number) {
    this.http.get<IAccount>(this.baseUrl + 'account/' + accountId).subscribe(next => {
      this.account = next;
    }, error => {
      this.errorLogger.log(error);
    });
  }

  private fetchOrders(accountId: number) {
    this.http.get<IOrderResponse>(this.baseUrl + 'order/accounts/' + accountId + '?pageSize=' + this.pageSize + '&page=' + this.pageIndex).subscribe(next => {
      this.orders = OrderHistoryComponent.orderOrdersByDate(next.orders);
      this.totalHistoryItems = next.totalItems;
    }, error => {
      this.errorLogger.log(error);
    });
  }

  calculateTotalDeposit(): number {
    return this.orders
      .map(x => x.deposit).reduce((prev, cur) => prev + cur, 0);
  }

  calculateOrderSpent(orderLines: IOrderLine[]): number {
    return orderLines.map(x => x.amount * x.productPriceCents).reduce((prev, cur) => prev + cur, 0);
  }

  calculateTotalSpent(): number {
    return this.orders
      .map(x => this.calculateOrderSpent(x.orderLines))
      .reduce((prev, cur) => prev + cur, 0);
  }

  private static orderOrdersByDate(orders: IOrder[]): IOrder[] {
    return orders.sort((x, y) => {
      if (x.orderDate > y.orderDate) {
        return -1;
      }
      return 1;
    });
  }

  navigateOrderHistoryItem(order: IOrder) {
    this.router.navigate(['/order-history-item', {orderId: order.id}]);
  }

  onPageEvent($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.fetchOrders(this.account.id);
  }
}

interface IOrderResponse {
  orders: IOrder[];
  totalItems: number;
}
