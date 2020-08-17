import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MoneyFormatter} from "../../MoneyFormatter";
import {IAccount} from "../../IAccount";
import {ErrorLoggerService} from "../error-logger.service";
import {Router} from "@angular/router";
import {ConfirmDialogService} from "../confirm-dialog.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: IAccount[] = [];

  constructor(
    private readonly http: HttpClient,
    @Inject('BASE_URL') private readonly baseUrl: string,
    private readonly errorLogger: ErrorLoggerService,
    private readonly router: Router,
    private readonly confirmService: ConfirmDialogService) {
  }

  ngOnInit() {
    this.http.get<IAccount[]>(this.baseUrl + 'account').subscribe(result => {
      this.accounts = result;
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
    console.log('sorting accounts: ', accounts);
    return accounts.sort((x, y) => {
      if(x.accountName.toLowerCase() > y.accountName.toLowerCase()) {
        return 1;
      }
      return -1;
    });
  }
}
