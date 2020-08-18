import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from '@angular/material/dialog';
import {NavGuard} from "../NavGaurd";
import {MatCardModule} from '@angular/material/card';
import {AccountsComponent} from "./accounts/accounts/accounts.component";
import {CreateAccountComponent} from "./accounts/create-account/create-account.component";
import {ProductsComponent} from "./products/products/products.component";
import {ProductComponent} from "./products/product/product.component";
import {OrderComponent} from "./products/order/order.component";
import {CategoryComponent} from "./products/category/category.component";
import {CreateCategoryComponent} from "./products/create-category/create-category.component";
import {ConfirmDialogComponent} from "./dialogs/confim-dialog/confirm-dialog.component";
import {NegativeCreditsDialogComponent} from "./dialogs/negative-credits-dialog/negative-credits-dialog.component";
import {OrderHistoryComponent} from "./order-history/order-history/order-history.component";
import {OrderHistoryItemComponent} from "./order-history/order-history-item/order-history-item.component";

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
    ConfirmDialogComponent,
    NegativeCreditsDialogComponent,
    OrderHistoryComponent,
    OrderHistoryItemComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    MatButtonModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: AccountsComponent, pathMatch: 'full'},
      {path: 'accounts', component: AccountsComponent},
      {path: 'create-account', component: CreateAccountComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'product', component: ProductComponent},
      {path: 'order', component: OrderComponent, canDeactivate: [NavGuard]},
      {path: 'create-category', component: CreateCategoryComponent},
      {path: 'order-history', component: OrderHistoryComponent},
      {path: 'order-history-item', component: OrderHistoryItemComponent},
    ]),
    BrowserAnimationsModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule
  ],
  providers: [NavGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent,
    NegativeCreditsDialogComponent
  ]
})
export class AppModule { }
