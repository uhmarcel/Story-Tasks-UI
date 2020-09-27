import {OktaAuthService} from '@okta/okta-angular';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {AuthActions} from '../actions';
import {User} from '../../models';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthSelectors} from '../selectors';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthEffects {

  hydrateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.hydrateUser),
      withLatestFrom(this.store.select(AuthSelectors.selectUser)),
      filter(([_, user]) => user == null),
      mergeMap(() => of(this.authService.getUser()).pipe(
        map((claims: any) => AuthActions
          .hydrateUserSuccess({
            id: claims?.sub,
            name: claims?.given_name,
            lastName: claims?.family_name,
            email: claims?.email,
            emailVerified: claims?.email_verified,
            locale: claims?.locale
          } as User)),
        catchError(error => of(AuthActions.signOut))
      ))
    )
  );

  authChangeOut$ = createEffect(() =>
    this.authService.$authenticationState.pipe(
     filter(isAuthenticated => isAuthenticated === false),
     tap(x => console.log('>> THIS ACTUALLY DOES SOMETHING <<')),
     map(AuthActions.signOut),
     catchError((error) => of(AuthActions.signOut))
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      mergeMap(() => of(this.authService.logout()).pipe(
        tap(() => this.router.navigate(['/'])),
        map(() => AuthActions.hydrateUserSuccess(null)),
        catchError(error => of(AuthActions.hydrateUserSuccess(null)))
      ))
    )
  );

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly actions$: Actions,
    private readonly authService: OktaAuthService,
  ) {}

}
