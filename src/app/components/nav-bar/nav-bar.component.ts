import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {StoryActions} from '../../store/actions';
import {OktaAuthService} from '@okta/okta-angular';
import {Observable} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {distinctUntilChanged, filter, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  public readonly isAuthenticated$: Observable<boolean>;

  // TODO: Fix authentication -> avoid refreshes, move to state.
  constructor(
    private readonly store: Store,
    private readonly authService: OktaAuthService,
    private readonly activatedRoute: ActivatedRoute,
    public readonly router: Router
  ) {}

  openStoryEditor() {
    this.store.dispatch(StoryActions.openStoryEditor({}));
  }

  signOut() {
    this.authService.logout();
  }

}
