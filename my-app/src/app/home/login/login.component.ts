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
      .subscribe(d => {
        this._router.navigate(["/home"]);
      }, err => {
        alert('Invalid Username');
      });
  }
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

}
