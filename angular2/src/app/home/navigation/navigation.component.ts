import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn: boolean = false;
  
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.$authStatus
      .subscribe(d => {
        this.isLoggedIn = d.isLoggedIn;
      });
  }

  logout() {
    this._authService.logout();
  }

}
