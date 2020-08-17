import {Component, Inject, Input, OnInit} from '@angular/core';
import {ICategory} from "../../IProduct";
import {MoneyFormatter} from "../../MoneyFormatter";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ErrorLoggerService} from "../error-logger.service";
import {ProductsChangedObservableService} from "../products-changed-observable.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input()
  category: ICategory;

  constructor(private readonly router: Router,
              @Inject("BASE_URL") private readonly baseUrl: string,
              private readonly http: HttpClient,
              private readonly errorLogger: ErrorLoggerService,
              private readonly productsChangedObservableService: ProductsChangedObservableService) { }

  ngOnInit() {
  }

  formatMoney(pricePerPieceCents: number): string {
    return MoneyFormatter.format(pricePerPieceCents);
  }


  navigateCreateCategory() {
    this.router.navigate(['/create-category', {id: this.category.id, parent: this.category.categoryName}]);
  }

  navigateProduct() {
    this.router.navigate(['/product', {categoryId: this.category.id, category: this.category.categoryName, isNew: true}]);
  }

  deleteProduct(productId: number) {
    this.http.delete(this.baseUrl + 'product/' + productId).subscribe(next => {
      this.productsChangedObservableService.notify();
    }, error => {
      this.errorLogger.log(error);
    });
  }
}
