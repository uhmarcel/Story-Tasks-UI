import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {OktaAuthService} from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: OktaAuthService,
    private readonly router: Router
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    const authenticated = await this.authService.isAuthenticated();
    if (!authenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
