import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  authForm: any = {};

  submit() {
    this._authService.login(this.authForm)
      .then(d => {
        if (d.isLoggedIn) {
          this._router.navigate(["/home"]);
        } else {
          alert('Invalid Username');
        }
      });
  }
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

}
