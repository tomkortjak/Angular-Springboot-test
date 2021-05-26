import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {log} from 'util';
import {Employee} from '../models/Employee';
import {CanActivate, Router} from '@angular/router';
import {AccountService} from './account.service';


@Injectable({
  providedIn: 'root'
})
export class SessionService implements CanActivate {
  token: string;
  BASE_URL: string;
  isAdmin: boolean;
  currentUser: Employee;

  constructor(private http: HttpClient, private router: Router) {
    this.BASE_URL = 'http://localhost:8081';
  }
  logIn(eMail: string, passWord: string, targetUrl?: string) {
    let oObservable =
      this.http.post<Employee>(this.BASE_URL + '/authenticate/login',
        {eMail: eMail, passWord: passWord},
        {observe: 'response'});
    oObservable.subscribe(
      response => {

        let token = response['headers'].get('Authorization');
        this.isAdmin = response.body.admin;


        if (token == null) {
          throw new Error('token was not present in the response');
        }

        token = token.replace('Bearer ', '');

        sessionStorage.setItem('token', token);
        this.updateUserInformation();


      },
      (err) => {
        console.log('authentication error', err);
        // this.currentUser = null;
        // this.currentToken = null;
      });
    return oObservable;
  }

  signOff() {
    sessionStorage.clear();
  }

  getUsername(): string {
    return null;
  }

  getToken(): string {
    return this.token;
  }

  checkIfAdmin() {
    return this.isAdmin;
  }

  refreshToken(): Observable<string> {
    const url = 'url to refresh token here';

    // append refresh token if you have one
    const refreshToken = localStorage.getItem('refreshToken');
    const expiredToken = localStorage.getItem('token');

    return this.http
      .get(url, {
        headers: new HttpHeaders()
          .set('refreshToken', refreshToken)
          .set('token', expiredToken),
        observe: 'response'
      })
      .pipe(
        share(),
        map(res => {
          const token = res.headers.get('token');
          const newRefreshToken = res.headers.get('refreshToken');
          // store the new tokens
          localStorage.setItem('refreshToken', newRefreshToken);
          localStorage.setItem('token', token);
          return token;
        })
      );
  }

  setToken(token: string): void {
    this.token = token;
  }

  setCurrentUser(employee: Employee) {
    this.currentUser = employee;
  }

  checkLoggedIn(): boolean {
    this.updateUserInformation();
    return this.token != undefined;
  }

  private updateUserInformation() {
    this.token = sessionStorage.getItem('token');
  }

  canActivate(): boolean {
    if (!this.checkLoggedIn()) {
      this.router.navigate(['/not-found']);
    }
    return this.checkLoggedIn();
  }
}
