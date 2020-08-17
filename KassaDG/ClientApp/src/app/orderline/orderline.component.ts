import {Component, Input, OnInit} from '@angular/core';
import {IOrderAmount} from "../basket.service";
import {MoneyFormatter} from "../../MoneyFormatter";

@Component({
  selector: 'app-orderline',
  templateUrl: './orderline.component.html',
  styleUrls: ['./orderline.component.css']
})
export class OrderlineComponent implements OnInit {

  @Input()
  orderLine: IOrderAmount;

  constructor() { }

  ngOnInit() {
  }

  calculateTotal(): string {
    return MoneyFormatter.format(this.orderLine.pricePerPiece * this.orderLine.amount);
  }
}
