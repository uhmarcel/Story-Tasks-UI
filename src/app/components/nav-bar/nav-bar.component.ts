import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AuthActions, StoryActions} from '../../store/actions';
import { Router } from '@angular/router';
import {AuthSelectors} from '../../store/selectors';
import {Observable} from 'rxjs';
import {NavigationMenuService} from '../../services/navigation-menu.service';
import {CONSTANTS} from '../../config/constants.config';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  public readonly appTitle = CONSTANTS.APP_NAME;

  public user$ = this.store.pipe(
    select(AuthSelectors.selectUser)
  );

  constructor(
    public readonly menuService: NavigationMenuService,
    public readonly router: Router,
    private readonly store: Store
  ) {}

  openStoryEditor() {
    this.store.dispatch(StoryActions.openStoryEditor({}));
  }

  signOut() {
    this.store.dispatch(AuthActions.signOut());
  }

}
