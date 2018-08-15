import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $authChange: Subject<any> = new Subject<any>();
  authForm: Object = undefined;

  login(credentials) {
    var $defer: Subject<any> = new Subject<any>();
    setTimeout(function () {
      if (credentials.username === 'zhaoyi') {
        this.authForm = {
          username: credentials.username,
          time: new Date(),
        };
        $defer.next(true);
        this.$authChange.next(true);
      } else {
        this.authForm = undefined;
        $defer.error(false);
        this.$authChange.next(false);
      }
    }.bind(this), 100);
    return $defer;
  }

  logout() {
    var $defer: Subject<any> = new Subject<any>();
    setTimeout(function () {
      this.authForm = undefined;
      $defer.next(true);
      this.$authChange.next(false);
    }.bind(this), 100);
    return $defer;
  }

  constructor() { }
}
