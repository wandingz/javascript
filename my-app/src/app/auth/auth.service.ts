import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { Subject, BehaviorSubject } from 'rxjs';
import { Promise } from 'q';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    $authStatus: BehaviorSubject<any>;

    constructor(private _cookieService: CookieService) {
        var obj = { isLoggedIn: false }
        try {
            obj = JSON.parse(this._cookieService.get('loggedInUsername'));
        } catch { }

        this.$authStatus = new BehaviorSubject<any>(obj);
        this.$authStatus.subscribe(obj => {
            this._cookieService.set('loggedInUsername', JSON.stringify(obj));
        });

    }

    login(credentials) {
        return Promise<any>((resolve, reject) => {
            setTimeout(function () {
                if (credentials.username === 'zhaoyi') {
                    this.$authStatus.next({
                        isLoggedIn: true,
                        username: credentials.username,
                        time: new Date(),
                    });
                } else {
                    this.$authStatus.next({
                        isLoggedIn: false,
                    });
                }
                resolve(this.$authStatus.value);
            }.bind(this), 100);
        });
    }

    logout() {
        setTimeout(function () {
            this.$authStatus.next({
                isLoggedIn: false,
            });
        }.bind(this), 100);
        return this.$authStatus;
    }

}
