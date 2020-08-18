import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ConfirmDialogService} from "../../dialogs/confirm-dialog.service";
import {ErrorLoggerService} from "../../error-logger.service";
import {IAccount} from "../../../IAccount";
import {MoneyFormatter} from "../../../MoneyFormatter";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  allAccounts: IAccount[] = [];
  shownAccounts: IAccount[] = [];
  search: string;

  constructor(
    private readonly http: HttpClient,
    @Inject('BASE_URL') private readonly baseUrl: string,
    private readonly errorLogger: ErrorLoggerService,
    private readonly router: Router,
    private readonly confirmService: ConfirmDialogService) {
  }

  ngOnInit() {
    this.http.get<IAccount[]>(this.baseUrl + 'account').subscribe(result => {
      this.allAccounts = result;
      this.shownAccounts = result;
    }, error => console.error(error));
  }

  formatMoney(balanceCents: number): string {
    return MoneyFormatter.format(balanceCents);
  }

  async deleteAccount(id: number) {
    if(await this.confirmService.confirmDialog("Weet je zeker dat je het account wilt verwijderen?")) {
      this.sendDeleteAccountCommand(id);
    }
  }

  private sendDeleteAccountCommand(id: number) {
    this.http.delete(this.baseUrl + 'account/' + id).subscribe(next => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        return this.router.navigateByUrl('/accounts');
      });
    }, error => {
      this.errorLogger.log(error);
    });
  }

  navigateAccount(id: number) {
    this.router.navigate(['/order', {accountId: id}]);
  }

  sortAccounts(accounts: IAccount[]): IAccount[] {
    return accounts.sort((x, y) => {
      if(x.accountName.toLowerCase() > y.accountName.toLowerCase()) {
        return 1;
      }
      return -1;
    });
  }

  navigateAccountHistory(id: number) {
    this.router.navigate(['/order-history', {accountId: id}]);
  }

  searchChanged(search: string) {
    if(search === '') {
      this.shownAccounts = this.allAccounts;
    } else {
      this.applySearch(search);
    }
  }
  private applySearch(search: string) {
    this.shownAccounts = this.allAccounts.filter(x => x.accountName.toLowerCase().startsWith(search));
  }

}
