import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthActions} from '../../store/actions';
import {User} from '../../models';

@Component({
  template: '<div>{{ error }}</div>'
})
export class AuthComponent implements OnInit {

  public error: string;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly authService: OktaAuthService,
  ) {}

  ngOnInit(): void {
    this.authService.handleAuthentication()
      .then(() => this.router.navigate(['/']))
      .catch(error => this.error = error);
  }

}
