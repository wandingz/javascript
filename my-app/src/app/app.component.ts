import { Component } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

class User {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    credit: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string = 'my-app';
    loading: boolean = false;
    data: object = {};
    error: object = {};
    user: User = {
        username: 'zhaoyi',
        password: '123',
        first_name: 'Yi',
        last_name: 'Zhao',
        credit: 1000,
    };
    constructor(private http: Http) {
    }
    submit(): void {
        this.loading = true;
        this.http.post('http://localhost:3000/users', this.user)
            .map((res: Response) => res.json())
            .subscribe(
                (data) => {
                    this.loading = false;
                    this.data = data;
                },
                (err) => {
                    this.loading = false;
                    this.error = err;
                }
            );
    }
}
