import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductsChangedObservableService} from "../products-changed-observable.service";
import {ICategory} from "../../../IProduct";

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
    this.categories = ProductsComponent.sortCategories(result.filter(x => x.parentCategoryId == null));
  }

  private static sortCategories(categories: ICategory[]): ICategory[] {
    if (categories == null) {
      return null;
    }
    return categories.sort((x, y) => {
      if (x.categoryName.toLowerCase() > y.categoryName.toLowerCase()) {
        return 1;
      }
      return -1;
    });
  }
}
