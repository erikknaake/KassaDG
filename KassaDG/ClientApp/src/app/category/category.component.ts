import {Component, Input, OnInit} from '@angular/core';
import {ICategory} from "../../IProduct";
import {MoneyFormatter} from "../../MoneyFormatter";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input()
  category: ICategory;

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

  formatMoney(pricePerPieceCents: number): string {
    return MoneyFormatter.format(pricePerPieceCents);
  }


  navigateCreateCategory() {
    //[routerLink]="['/create-category?id=' + category.categoryId + '&parent='+category.categoryName]
    this.router.navigate(['/create-category', {id: this.category.categoryId, parent: this.category.categoryName}]);
  }
}
