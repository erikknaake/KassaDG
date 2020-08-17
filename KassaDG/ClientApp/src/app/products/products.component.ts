import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICategory} from "../../IProduct";
import {ProductsChangedObservableService} from "../products-changed-observable.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories: ICategory[];

  @Input()
  isOrdering: boolean

  constructor(
    private readonly http: HttpClient,
    @Inject('BASE_URL') private readonly baseUrl: string,
    private readonly productsChangedObservableService: ProductsChangedObservableService) {
    productsChangedObservableService.subscribe(() => {this.ngOnInit()});
  }

  ngOnInit() {
    this.http.get<ICategory[]>(this.baseUrl + 'productcategory').subscribe(result => {
      this.processProducts(result);
    }, error => console.error(error));
  }

  private processProducts(result: ICategory[]) {
    this.categories = result.filter(x => x.parentCategoryId == null);
  }
}
