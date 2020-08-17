import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basket: IOrderAmount[] = [];
  private subscribers: basketChangedFunction[] = [];

  constructor() { }

  addProduct(productName: string, productId: number, pricePerPiece: number) {
    let current: IOrderAmount = this.basket.filter(x => x.productId === productId)[0];
    if(current == null) {
      current = {
        productId,
        amount: 1,
        pricePerPiece,
        productName
      }
      this.basket.push(current);
    } else {
      current.amount++;
    }
    this.basketChanged();
  }

  removeProduct(productId: number) {
    let current: IOrderAmount = this.basket.filter(x => x.productId === productId)[0];
    if(current != null) {
      if(current.amount > 0) {
        current.amount--;
      }
      if(current.amount == 0) {
        this.basket = this.basket.filter(x => x.productId !== productId);
      }
    }
    this.basketChanged();
  }

  clear() {
    this.basket = [];
    this.basketChanged();
  }

  subscribe(basketChangedFunction) {
    this.subscribers.push(basketChangedFunction);
  }

  private basketChanged() {
    this.subscribers.forEach(x => x(this.basket));
  }
}

type basketChangedFunction = (orderAmounts: IOrderAmount[]) => void;

export interface IOrderAmount {
  amount: number;
  productName: string;
  productId: number;
  pricePerPiece: number;
}
