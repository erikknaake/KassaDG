import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {IVersion} from "./i-version";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  version = '';

  constructor(private readonly http: HttpClient, @Inject('BASE_URL') private readonly baseUrl: string,) {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.http.get<IVersion>(this.baseUrl + 'version').subscribe(result => {
      const versionParts = result.version?.split('.');
      if(versionParts?.length === 4) {
        this.version = `${versionParts[0]}.${versionParts[1]}.${versionParts[2]}`;
      } else {
        this.version = result.version;
      }
    })
  }
}
