import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccount} from "../../IAccount";
import {ICategory, IProduct} from "../../IProduct";
import {MoneyFormatter} from "../../MoneyFormatter";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories: ICategory[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<ICategory[]>(baseUrl + 'productcategory').subscribe(result => {
      this.processProducts(result);
    }, error => console.error(error));
  }

  ngOnInit() {
  }

  private processProducts(result: ICategory[]) {
    this.categories = result.filter(x => x.parentCategoryId == null);
  }
}
