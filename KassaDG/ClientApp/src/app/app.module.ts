import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
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
import {MatCheckboxModule} from "@angular/material/checkbox";
import {LoadingComponent} from './loading/loading.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ManagementComponent} from './management/management.component';
import {ManageAccountsComponent} from "./accounts/manage-accounts/manage-accounts.component";
import {StockComponent} from "./management/stock/stock.component";
import {StatisticsComponent} from "./management/statistics/statistics.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {BalanceChipComponent} from "./accounts/accounts/balance-chip/balance-chip.component";
import {MatChipsModule} from "@angular/material/chips";

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
    OrderHistoryItemComponent,
    LoadingComponent,
    ManageAccountsComponent,
    ManagementComponent,
    StockComponent,
    StatisticsComponent,
    BalanceChipComponent,
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
    MatNativeDateModule,
    RouterModule.forRoot([
      {path: '', component: AccountsComponent, pathMatch: 'full'},
      {path: 'accounts', component: AccountsComponent},
      {path: 'create-account', component: CreateAccountComponent},
      {path: 'management', component: ManagementComponent},
      {path: 'manage-accounts', component: ManageAccountsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'product', component: ProductComponent},
      {path: 'order', component: OrderComponent, canDeactivate: [NavGuard]},
      {path: 'create-category', component: CreateCategoryComponent},
      {path: 'order-history', component: OrderHistoryComponent},
      {path: 'order-history-item', component: OrderHistoryItemComponent},
      {path: 'stock', component: StockComponent},
      {path: 'statistics', component: StatisticsComponent},
    ]),
    BrowserAnimationsModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatChipsModule
  ],
  providers: [NavGuard,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false, }}],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent,
    NegativeCreditsDialogComponent
  ]
})
export class AppModule {
}
