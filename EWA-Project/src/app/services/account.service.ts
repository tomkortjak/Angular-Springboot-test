import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Employee} from '../models/Employee';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  BASE_URL: string;
  public accounts: Employee[];
  private selectedAccountId: number;
  public selectedAccount: Employee;

  executedOperation;
  executedNameOp;


  constructor(private http: HttpClient) {
    this.accounts = [];
    this.BASE_URL = 'http://localhost:8081';
  }

  fetchAccounts() {
    this.http.get<Employee[]>(this.BASE_URL + '/rest/accounts')
      .subscribe(
        account => {
          this.accounts = account ? account : [];
        },
        error => console.log(error)
      );

  }

  public updateSelectedAccount() {
    this.http.get<Employee>(this.BASE_URL + '/rest/accounts/' + this.selectedAccountId)
      .subscribe(
        account => {
          this.selectedAccount = account ? account : null;
        },
        error => console.log(error)
      );
  }

  public setSelectedAccountId(value: number) {
    this.selectedAccountId = value;
  }

  public getSelectedAccountId() {
    return this.selectedAccountId;
  }

  public saveAccount() {
    if (this.selectedAccountId == null) {
      return this.http.post<Employee>(this.BASE_URL + '/rest/accounts', this.selectedAccount)
        .subscribe();
    } else {
      console.log(this.selectedAccount);
      console.log(this.selectedAccountId);
      return this.http.put<Employee>(this.BASE_URL + '/rest/accounts/' + this.selectedAccountId, this.selectedAccount)
        .subscribe(
          response => {
            console.log('received bool', response != null);
            this.executedOperation = response != null;
            this.executedNameOp = 'opgeslagen';
            return response != null;
          },
          error => console.log(error));
    }
  }

  filterAccounts(naam: string, email: string, stadsdeel: string) {
    let parameters = new HttpParams();
    if(naam != null ) {
      parameters = parameters.append('name', naam);
    }
    if(email != null) {
      parameters = parameters.append('email', email);
    }
    if(stadsdeel != null) {
      parameters = parameters.append('district', stadsdeel)
    }

    this.http.get<Employee[]>(this.BASE_URL + '/rest/accounts', {params: parameters})
      .subscribe(
        accounts => {
          this.accounts = accounts ? accounts : [];
        },
        error => console.log(error)
      );

  }

  public deleteAccount() {
    return this.http.delete(this.BASE_URL + '/rest/accounts/' + this.selectedAccountId)
      .subscribe(
        response => {
          console.log('received bool', response != null);
          this.executedOperation = response != null;
          this.executedNameOp = 'verwijderd';
          return response != null;
        },
        error => console.log(error)
      );
  }
}
