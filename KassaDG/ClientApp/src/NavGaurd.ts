import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {OrderComponent} from "./app/products/order/order.component";
import {ConfirmDialogService} from "./app/dialogs/confirm-dialog.service";
import {CommitingOrderService} from "./app/products/commiting-order.service";

@Injectable()
export class NavGuard implements CanDeactivate<OrderComponent> {

  constructor(private readonly confirmDialog: ConfirmDialogService,
              private readonly commitingOrder: CommitingOrderService) {
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
    if(!this.commitingOrder.isCommitingOrder) {
      return from(this.confirmDialog.confirmDialog(this._message));
    } else {
      return true;
    }
  }
}
