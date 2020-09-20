import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(
    private readonly store: Store,
    private readonly authService: OktaAuthService,
  ) {}

  async ngOnInit() {
    this.isAuthenticated = await this.authService.isAuthenticated();
    console.log(this.isAuthenticated);
    console.log(this.authService.getAccessToken());

    // Subscribe to authentication state changes
    this.authService.$authenticationState.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  login() {
    this.authService.loginRedirect();
  }

}
