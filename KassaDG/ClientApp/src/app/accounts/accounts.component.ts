import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MoneyFormatter} from "../../MoneyFormatter";
import {IAccount} from "../../IAccount";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: IAccount[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<IAccount[]>(baseUrl + 'account').subscribe(result => {
      this.accounts = result;
    }, error => console.error(error));
  }

  ngOnInit() {
  }

  formatMoney(balanceCents: number): string {
    return MoneyFormatter.Format(balanceCents);
  }
}
