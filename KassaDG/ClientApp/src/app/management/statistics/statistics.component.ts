import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorLoggerService} from "../../error-logger.service";
import {IOrder, IOrderLine} from "../../../IOrder";
import {FormControl} from "@angular/forms";
import {MoneyFormatter} from "../../../MoneyFormatter";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalSpent: number;
  totalDeposit: number;
  productStatistics: IProductStatistic[];

  startDate: FormControl;
  endDate: FormControl;


  constructor(@Inject("BASE_URL") private readonly baseUrl: string,
              private readonly http: HttpClient,
              private readonly errorLogger: ErrorLoggerService) {

    const currentDate: Date = new Date();
    this.endDate = new FormControl(currentDate);

    const pastDate: Date = new Date();
    pastDate.setDate(pastDate.getDate() - 7);
    this.startDate = new FormControl(pastDate);
  }

  ngOnInit() {
    this.fetchStatistics();
  }

  fetchStatistics() {
    this.http.get<IOrder[]>(this.baseUrl + 'order/statistics?startDate=' + this.startDate.value.toISOString() + '&endDate=' + this.endDate.value.toISOString())
      .subscribe(next => {
        this.processOrders(next);
      }, error => {
        this.errorLogger.log(error)
      });
  }

  private processOrders(orders: IOrder[]) {
    this.totalDeposit = StatisticsComponent.calculateTotalDeposit(orders);
    this.productStatistics = StatisticsComponent.calculateStatisticsPerProduct(orders);
    this.totalSpent = StatisticsComponent.calculateTotalSpent(this.productStatistics);
  }

  private static calculateTotalSpent(categoryStatistics: IProductStatistic[]) {
    return categoryStatistics.map(x => x.totalSpent).reduce((prev, cur) => prev + cur, 0);
  }

  private static calculateStatisticsPerProduct(orders: IOrder[]): IProductStatistic[] {
    let result: IProductStatistic[] = [];
    orders.forEach(order => {
      order.orderLines.forEach(orderLine => {
        result = this.processOrderLine(result, orderLine);
      });
    });
    return result;
  }

  private static calculateTotalDeposit(orders: IOrder[]) {
    return orders.map(x => x.deposit).reduce((prev, cur) => prev + cur, 0);
  }

  private static processOrderLine(result: IProductStatistic[], orderLine: IOrderLine): IProductStatistic[] {
    const index: number = result.findIndex(x => x.productName === orderLine.productName);
    if(index === -1) {
      const statisticItem: IProductStatistic = {
        totalSpent: orderLine.amount * orderLine.productPriceCents,
        totalOrders: orderLine.amount,
        productName: orderLine.productName
      };
      result.push(statisticItem);
    } else {
      const statisticItem: IProductStatistic = result[index];
      statisticItem.totalOrders += orderLine.amount;
      statisticItem.totalSpent += orderLine.amount * orderLine.productPriceCents;
    }
    return result;
  }

  formatMoney(cents: number): string {
    return MoneyFormatter.format(cents);
  }
}

interface IProductStatistic {
  totalSpent: number;
  totalOrders: number;
  productName: string;
}
