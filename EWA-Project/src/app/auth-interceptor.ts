import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {SessionService} from './services/session.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private session: SessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.session.getToken();
    if (token == null) {
      return next.handle(req);
    } else {
      const cloned =
        req.clone({setHeaders: {'Authorization': token }}); /* , withCredentials: true */
      return next.handle(cloned);
    }
  }

}
