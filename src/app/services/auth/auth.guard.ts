import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {OktaAuthService} from '@okta/okta-angular';
import {Store} from '@ngrx/store';
import {AuthActions} from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: OktaAuthService,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    const authenticated = await this.authService.isAuthenticated();
    if (!authenticated) {
      this.router.navigate(['login']);
      return false;
    }
    this.store.dispatch(AuthActions.hydrateUser());
    return true;
  }

}
