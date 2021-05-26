import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../../../services/session.service';
import {AccountService} from '../../../../services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  selectedAccountIndex: number;

  constructor(private accountService: AccountService ) {
    this.accountService.fetchAccounts();
  }

  ngOnInit() {
  }

}
