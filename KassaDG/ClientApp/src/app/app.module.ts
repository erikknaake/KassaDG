import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AccountsComponent } from './accounts/accounts.component';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateAccountComponent } from './create-account/create-account.component';
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import {OrderComponent} from "./order/order.component";
import { CategoryComponent } from './category/category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import { ConfimDialogComponent } from './confim-dialog/confim-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { OrderlineComponent } from './orderline/orderline.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AccountsComponent,
    CreateAccountComponent,
    ProductsComponent,
    ProductComponent,
    OrderComponent,
    CategoryComponent,
    CreateCategoryComponent,
    ConfimDialogComponent,
    OrderlineComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    MatButtonModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: AccountsComponent, pathMatch: 'full'},
      {path: 'accounts', component: AccountsComponent},
      {path: 'create-account', component: CreateAccountComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'product', component: ProductComponent},
      {path: 'order', component: OrderComponent},
      {path: 'create-category', component: CreateCategoryComponent},
    ]),
    BrowserAnimationsModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfimDialogComponent]
})
export class AppModule { }
