import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {OktaAuthService} from '@okta/okta-angular';
import * as SignInWidget from '@okta/okta-signin-widget';
import {oicdConfig} from '../../config/oicd.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly signInWidget = new SignInWidget({
    logo: '/assets/logo.svg',
    language: 'en',
    i18n: {
      en: {
        'primaryauth.title': 'Story Tasks Authentication',
      },
    },
    features: {
      registration: true,
      rememberMe: true,
      router: true,
    },
    baseUrl: oicdConfig.baseHref,
    clientId: oicdConfig.clientId,
    redirectUri: oicdConfig.redirectUri,
    authParams: {
      issuer: oicdConfig.issuer,
      display: 'page',
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile'],
      pkce: oicdConfig.pkce,
      cookies: {
        secure: false
      }
    },
    idps: [{
      type: 'GOOGLE',
      id: '0oa10n7fe9982Tg8J4x7'
    }]
  });

  constructor(
    private readonly store: Store,
    private readonly authService: OktaAuthService,
  ) {}

  ngOnInit() {
    this.signInWidget.renderEl({ el: '#sign-in-container' });
  }

  // async ngOnInit() {
  //   this.isAuthenticated = await this.authService.isAuthenticated();
  //   console.log(this.isAuthenticated);
  //   console.log(this.authService.getAccessToken());
  //
  //   // Subscribe to authentication state changes
  //   this.authService.$authenticationState.subscribe(
  //     (isAuthenticated: boolean) => {
  //       this.isAuthenticated = isAuthenticated;
  //     }
  //   );
  // }

  login() {
    this.authService.loginRedirect();
  }

}
