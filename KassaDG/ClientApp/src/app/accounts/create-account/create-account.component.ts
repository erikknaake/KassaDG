import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ErrorLoggerService} from "../../error-logger.service";
import {IAccount} from "../../../IAccount";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  name: string;

  constructor(private readonly http: HttpClient,
              @Inject('BASE_URL') private readonly baseUrl: string,
              private readonly router: Router,
              private readonly errorLogger: ErrorLoggerService) {
  }

  ngOnInit() {
  }

  createAccount() {
    const account: IAccount = {
      accountName: this.name,
      balanceCents: 0,
      isActive: true
    };
    this.http.put(this.baseUrl + "account", account).subscribe(result => {
      this.router.navigateByUrl("accounts")
    }, error => {
      if (error.status === 409) {
        this.errorLogger.openSnackbar("Accountnamen moeten uniek zijn", "Ok");
      } else {
        this.errorLogger.log(error)
      }
    });
  }
}
