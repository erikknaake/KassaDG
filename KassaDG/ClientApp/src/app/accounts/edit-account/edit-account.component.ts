import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorLoggerService} from "../../error-logger.service";
import {IAccount} from "../../../IAccount";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  private accountId: number;
  name: string

  constructor(private readonly http: HttpClient,
              @Inject('BASE_URL') private readonly baseUrl: string,
              private readonly router: Router,
              private readonly errorLogger: ErrorLoggerService,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
      this.http.get<IAccount>(this.baseUrl + 'account/' + this.accountId ).subscribe(next => {
        this.name = next.accountName;
      });
    })
  }

  editAccount() {
    this.http.patch(`${this.baseUrl}account/${this.accountId}/name`, {name: this.name}).subscribe(result => {
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
