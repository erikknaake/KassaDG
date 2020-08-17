import {Component, Inject, Input, OnInit} from '@angular/core';
import {ICategory, IProduct} from "../../IProduct";
import {MoneyFormatter} from "../../MoneyFormatter";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ErrorLoggerService} from "../error-logger.service";
import {ProductsChangedObservableService} from "../products-changed-observable.service";
import {ConfirmDialogService} from "../confirm-dialog.service";
import {BasketService} from "../basket.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input()
  category: ICategory;

  @Input()
  isOrdering: boolean;

  constructor(private readonly router: Router,
              @Inject("BASE_URL") private readonly baseUrl: string,
              private readonly http: HttpClient,
              private readonly errorLogger: ErrorLoggerService,
              private readonly productsChangedObservableService: ProductsChangedObservableService,
              private readonly confirmService: ConfirmDialogService,
              private readonly basket: BasketService) { }

  ngOnInit() {
  }

  formatMoney(pricePerPieceCents: number): string {
    return MoneyFormatter.format(pricePerPieceCents);
  }


  navigateCreateCategory() {
    this.router.navigate(['/create-category', {id: this.category.id, parent: this.category.categoryName}]);
  }

  navigateCreateProduct() {
    this.router.navigate(['/product', {categoryId: this.category.id,
      category: this.category.categoryName,
      isNew: true}]);
  }

  async deleteProduct(productId: number) {
    if(await this.confirmService.confirmDialog("Weet je zeker dat je het product wilt verwijderen?")) {
      this.sendDeleteProductCommand(productId);
    }
  }

  private sendDeleteProductCommand(productId: number) {
    this.http.delete(this.baseUrl + 'product/' + productId).subscribe(next => {
      this.productsChangedObservableService.notify();
    }, error => {
      this.errorLogger.log(error);
    });
  }

  navigateEditProduct(product: IProduct) {
    this.router.navigate(['/product', {
      categoryId: this.category.id,
      category: this.category.categoryName,
      isNew: false,
      productName: product.productName,
      pricePerPiece: product.pricePerPieceCents,
      productId: product.id,
      amountInStock: product.amountInStock
    }]);
  }

  addProductFromBasket(product: IProduct) {
    this.basket.addProduct(product.productName, product.id, product.pricePerPieceCents);
  }

  removeProductFromBasket(product: IProduct) {
    this.basket.removeProduct(product.id);
  }

  sortProducts(products: IProduct[]): IProduct[] {
    return products.sort((x, y) => {
      if(x.productName.toLowerCase() > y.productName.toLowerCase()) {
        return 1;
      }
      return -1;
    });
  }

  sortCategories(categories: ICategory[]): ICategory[] {
    if(categories == null) {
      return null;
    }
    return categories.sort((x, y) => {
      if(x.categoryName.toLowerCase() > y.categoryName.toLowerCase()) {
        return 1;
      }
      return -1;
    });
  }
}
