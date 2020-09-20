import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {StoryActions} from '../../store/actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private readonly store: Store) {}

  openStoryEditor() {
    this.store.dispatch(StoryActions.openStoryEditor({}));
  }

}
