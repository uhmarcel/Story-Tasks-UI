import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthActions, StoryActions} from '../../store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(
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
