import {Injectable} from '@angular/core';

type voidFn = () => void;

@Injectable({
  providedIn: 'root'
})
export class ProductsChangedObservableService {

  private subscribers: voidFn[] = [];

  constructor() {
  }

  subscribe(fn: voidFn) {
    this.subscribers.push(fn);
  }

  notify() {
    this.subscribers.forEach(x => {
      x();
    })
  }
}
