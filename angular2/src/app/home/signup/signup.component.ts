import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm: any = {};

  submit() {
    this._authService.register(this.authForm)
      .subscribe(d => {
        this._router.navigate(["/home"]);
      }, err => {
        console.log(err);
        alert('Invalid Username');
      });
  }
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

}
