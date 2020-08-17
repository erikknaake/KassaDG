import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {IProduct} from "../../IProduct";
import {HttpClient} from "@angular/common/http";
import {ErrorLoggerService} from "../error-logger.service";
import {MoneyFormatter} from "../../MoneyFormatter";
import {ProductsComponent} from "../products/products.component";
import {ProductsChangedObservableService} from "../products-changed-observable.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productName: string;
  pricePerPiece: number;
  isNew: boolean;
  private categoryId: number;
  private categoryName: string;

  constructor(@Inject("BASE_URL") private readonly baseUrl: string,
              private readonly http: HttpClient,
              private readonly router: Router,
              private readonly errorHandler: ErrorLoggerService,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params['categoryId'];
        this.categoryName = params['category'];
        this.isNew = params['isNew'];
      }
    );
  }

  updateProduct() {

  }

  async createProduct() {
    const product: IProduct = {
      pricePerPieceCents: MoneyFormatter.toCents(this.pricePerPiece),
      productName: this.productName,
      productCategoryId: this.categoryId,
      id: 0
    };

    this.http.put(this.baseUrl + 'product', product).subscribe(next => {
        this.router.navigateByUrl('/products');
      },
      error => {
        this.errorHandler.log(error);
      })
  }
}
