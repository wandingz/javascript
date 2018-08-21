import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    $authStatus: BehaviorSubject<any>;

    constructor(private _cookieService: CookieService, private _http: HttpClient) {
        var obj = { isLoggedIn: false }
        try {
            obj = JSON.parse(this._cookieService.get('loggedInUsername'));
        } catch { }

        this.$authStatus = new BehaviorSubject<any>(obj);
        this.$authStatus.subscribe(obj => {
            this._cookieService.set('loggedInUsername', JSON.stringify(obj), 1, "/");
            this._cookieService.set('authorization', obj.token, 1, "/");
        });

    }

    login(credentials) {
        var $process = new Subject<any>();
        this._http.post('http://localhost:3000/authenticate', credentials)
            .subscribe((resp: any) => {
                if (resp.isLoggedIn) {
                    this.$authStatus.next(resp);
                    $process.next(true);
                    $process.complete();
                } else {
                    alert('Wrong credentials. ');
                    $process.error(false);
                }
            }, (err: any) => {
                console.log(err);
                alert(err.message);
                $process.error(false);
            });
        return $process;
    }

    logout() {
        var $process = new Subject<any>();
        setTimeout(function () {
            this.$authStatus.next({
                isLoggedIn: false,
            });
            $process.next(true);
            $process.complete();
        }.bind(this), 100);
        return $process;
    }

}
