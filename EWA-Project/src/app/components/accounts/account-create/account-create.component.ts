import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {Employee} from '../../../models/Employee';
import {Project} from "../../../models/Project";
import {Router} from "@angular/router";
import {SessionService} from '../../../services/session.service';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit, OnDestroy {
  editedAccount: Employee;

  operation;
  doOperation = true;

  constructor(private accountService: AccountService, private nav: Router, private session: SessionService) {
  }

  ngOnInit() {
    if(this.accountService.getSelectedAccountId() != null){
      this.accountService.updateSelectedAccount();
    } else {
      this.accountService.selectedAccount = new Employee;
    }
    this.editedAccount = Object.assign(new Employee(), this.accountService.selectedAccount);
    this.doOperation = false;

  }

  ngOnDestroy(): void {
    this.accountService.setSelectedAccountId(null);
    this.accountService.selectedAccount = null;
  }

  clearAccount(): void {
    this.accountService.selectedAccount = Object.assign(new Employee(), this.editedAccount);
  }

  cancelOperation(){
    this.doOperation = false;
  }

  executeOperation(operation: String){
    this.operation = operation;
    this.doOperation = true;
  }

  confirmOperation(operation: String){
    switch (operation) {
      case 'opslaan?':
        this.accountService.saveAccount();
        this.nav.navigate(['accounts']);
        break;
      case 'verwijderen?':
        this.accountService.deleteAccount();
        this.nav.navigate(['accounts']);
        break;
      case 'resetten?':
        this.clearAccount();
        this.doOperation = false;
        break;
    }
  }
}
