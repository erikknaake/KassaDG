import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "../../../IProduct";
import {ErrorLoggerService} from "../../error-logger.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  stock: IProduct[] = [];

  constructor(@Inject("BASE_URL") private readonly baseUrl: string,
              private readonly http: HttpClient,
              private readonly errorLogger: ErrorLoggerService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.http.get<IProduct[]>(this.baseUrl + 'product').subscribe(next => {
      this.stock = next;
    }, error => {
      this.errorLogger.log(error);
    });
  }

  updateStock() {
    const stockToUpdate: IUpdateStockCommand = {
      stockToUpdate: this.stock.map(x => {
        return {newAmount: x.amountInStock, productId: x.id}
      })
    }
    this.http.post(this.baseUrl + 'product/updateStock', stockToUpdate).subscribe(next => {
      this.router.navigateByUrl('/accounts');
    }, error => {
      this.errorLogger.log(error);
    });
  }
}

interface IUpdateStockCommand {
  stockToUpdate: IUpdateStockCommandLine[]
}
interface IUpdateStockCommandLine {
  productId: number,
  newAmount: number
}
