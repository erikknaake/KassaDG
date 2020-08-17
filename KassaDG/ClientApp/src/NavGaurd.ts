import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';

import {OrderComponent} from "./app/order/order.component";
import {ConfirmDialogService} from "./app/confirm-dialog.service";

@Injectable()
export class NavGuard implements CanDeactivate<OrderComponent> {

  constructor(private readonly confirmDialog: ConfirmDialogService) {
  }

  private readonly _message = "Weet je zeker dat je de bestelling niet wil afronden. Gemaakte wijzigingen zullen niet worden opgeslagen";

  /**
   * Prevent the routes from changing
   * @param component
   * @param route
   * @param state
   */
  canDeactivate(
    component: OrderComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return from(this.confirmDialog.confirmDialog(this._message));
  }
}
