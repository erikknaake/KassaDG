import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ICategory} from "../../IProduct";
import {ErrorLoggerService} from "../error-logger.service";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  parentId: number = 0;
  parent: string = '';
  categoryName: string;

  constructor(private http: HttpClient,
              @Inject("BASE_URL") private baseUrl: string,
              private route: ActivatedRoute,
              private errorHandler: ErrorLoggerService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.parentId = params['id'];
        this.parent = params['parent'];
      }
    );
  }

  addCategory() {
    const category: ICategory = {
      categoryName: this.categoryName,
      categoryId: 0,
      childrenCategories: [],
      parentCategoryId: Number(this.parentId),
      parentCategory: null,
      products: []
    };
    this.http.put(this.baseUrl + 'productCategory', category).subscribe(next => {
      this.router.navigateByUrl('products');
    }, error => {
      this.errorHandler.log(error);
    });
  }
}
