import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ConfirmDialogService} from "../../dialogs/confirm-dialog.service";
import {ErrorLoggerService} from "../../error-logger.service";
import {IAccount} from "../../../IAccount";
import {MoneyFormatter} from "../../../MoneyFormatter";
import distance from "jaro-winkler";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  allAccounts: IAccount[] = [];
  shownAccounts: IAccount[] = [];
  search: string;

  @Input()
  isManaging: boolean = false;

  constructor(
    private readonly http: HttpClient,
    @Inject('BASE_URL') private readonly baseUrl: string,
    private readonly errorLogger: ErrorLoggerService,
    private readonly router: Router,
    private readonly confirmService: ConfirmDialogService) {
  }

  ngOnInit() {
    this.http.get<IAccount[]>(this.baseUrl + 'account').subscribe(result => {
      if(!this.isManaging) {
        result = result.filter(x => x.isActive);
      }
      this.allAccounts = this.sortAccounts(result);
      this.shownAccounts = this.allAccounts;
    }, error => console.error(error));
  }

  async deleteAccount(id: number) {
    if (await this.confirmService.confirmDialog("Weet je zeker dat je het account wilt verwijderen?")) {
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

  navigateAccount(account: IAccount) {
    if (account.isActive && !this.isManaging) {
      this.router.navigate(['/order', {accountId: account.id}]);
    } else if (!this.isManaging) {
      this.errorLogger.openSnackbar('Dit account is gedeactiveerd', 'Ok');
    }
  }

  sortAccounts(accounts: IAccount[]): IAccount[] {
    return accounts.sort((x, y) => {
      if (x.accountName.toLowerCase() > y.accountName.toLowerCase()) {
        return 1;
      }
      return -1;
    });
  }

  sortAccountsBySearchRelevance(accounts: IAccount[], search: string): IAccount[] {
    return accounts.sort((x, y) => {
      if (
        (x.accountName.toLowerCase().indexOf(search.toLowerCase()) < 0 ||
          distance(x.accountName, search, {caseSensitive: false}) <
          distance(y.accountName, search, {caseSensitive: false}))) {
        return 1;
      }
      return -1;
    });
  }

  navigateAccountHistory(id: number) {
    this.router.navigate(['/order-history', {accountId: id}]);
  }

  searchChanged(search: string) {
    if (search == null || search === '' || search.length == 0) {
      this.resetSearch();
    }
    this.applySearch(search);
  }

  private resetSearch() {
    this.shownAccounts = this.sortAccounts(this.allAccounts);
  }

  private applySearch(search: string) {
    this.shownAccounts = this.sortAccountsBySearchRelevance(this.allAccounts, search);
  }

  deActivateAccount(account: IAccount) {
    this.http.post(this.baseUrl + 'account/' + account.id + '/disable', {}).subscribe(next => {
      account.isActive = false;
    }, error => {
      this.errorLogger.log(error);
    })
  }

  activateAccount(account: IAccount) {
    this.http.post(this.baseUrl + 'account/' + account.id + '/enable', {}).subscribe(next => {
      account.isActive = true;
    }, error => {
      this.errorLogger.log(error);
    })
  }
}
