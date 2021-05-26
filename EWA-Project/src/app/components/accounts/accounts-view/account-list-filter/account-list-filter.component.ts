import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../../services/account.service';

@Component({
  selector: 'app-account-list-filter',
  templateUrl: './account-list-filter.component.html',
  styleUrls: ['./account-list-filter.component.css']
})
export class AccountListFilterComponent implements OnInit {
  naam: string;
  email: string;
  stadsdeel: string;

  constructor(private service: AccountService) {
  }

  ngOnInit() {
  }

  search() {
    if (this.naam == null && this.email == null && this.stadsdeel == null) {
      this.service.filterAccounts(null, null, null);
    } else if (this.naam != null && this.email == null && this.stadsdeel == null) {
      this.service.filterAccounts(this.naam, null, null);
    } else if (this.naam == null && this.email != null && this.stadsdeel == null) {
      this.service.filterAccounts(null, this.email, null);
    } else if (this.naam == null && this.email == null && this.stadsdeel != null) {
      this.service.filterAccounts(null, null, this.stadsdeel);
    } else if (this.naam != null && this.email != null && this.stadsdeel == null) {
      this.service.filterAccounts(this.naam, this.email, null);
    } else if (this.naam != null && this.email == null && this.stadsdeel != null) {
      this.service.filterAccounts(this.naam, null, this.stadsdeel);
    } else if (this.naam == null && this.email != null && this.stadsdeel != null) {
      this.service.filterAccounts(null, this.email, this.stadsdeel);
    } else if (this.naam != null && this.email != null && this.stadsdeel != null) {
      this.service.filterAccounts(this.naam, this.email, this.stadsdeel);
    }
  }
}
