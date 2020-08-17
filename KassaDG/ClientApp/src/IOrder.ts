import {IAccount} from "./IAccount";

export interface IOrder {
  id: number;
  orderLines: IOrderLine[];
  accountId: number;
  account: IAccount;
  orderDate: Date;
  deposit?: number;
}

export interface IOrderLine {
  id: number;
  orderId: number;
  order: IOrder;
  productName: string;
  productPriceCents: number;
  amount: number;
}
