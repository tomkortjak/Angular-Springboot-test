import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../../../../services/account.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent implements OnInit, OnDestroy, DoCheck {

  executedOperation;
  executedName;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    setTimeout(function(accountService: AccountService) {
      accountService.fetchAccounts();
    }, 2000, this.accountService);
  }

  ngDoCheck(): void {
    this. executedName = this.accountService.executedNameOp;
    this.executedOperation = this.accountService.executedOperation ;
  }

  ngOnDestroy(): void {
    this.accountService.executedNameOp = '';
    this.accountService.executedOperation = false;
  }

}
