import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http'

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(req, next) {
    var token = this._authService.$authStatus.value.token;
    var reqClone;
    if (token) {
      reqClone = req.clone({ headers: new HttpHeaders().set('authorization', token) });
    } else {
      reqClone = req.clone();
    }
    return next.handle(reqClone);
  }

}
