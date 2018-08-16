import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginRouteGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!this._authService.$authStatus.value.isLoggedIn) {
      this._router.navigate(['/login']);
    }
    return this._authService.$authStatus.value.isLoggedIn;
  }

}
