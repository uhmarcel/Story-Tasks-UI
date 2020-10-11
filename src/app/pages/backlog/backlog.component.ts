import { Component } from '@angular/core';
import {keyValue, MenuItem, StoryItem, StoryItemParams} from '../../models';
import {select, Store} from '@ngrx/store';
import {AuthSelectors, StoryComponentSelectors, StorySelectors} from '../../store/selectors';
import {StoryActions} from '../../store/actions';
import {CONSTANTS} from '../../config/constants.config';
import {environment} from '../../../environments/environment';

export const BACKLOG_PAGE_MENU_ITEM: MenuItem = {
  route: '/backlog',
  title: 'Backlog'
};

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent {

  public readonly debug = !environment.production;

  public readonly storyIds$ = this.store.pipe(
    select(StorySelectors.selectStoryIDsByParentID(CONSTANTS.NO_PARENT))
  );

  public readonly loading$ = this.store.pipe(
    select(StorySelectors.selectIsLoading)
  );

  constructor(private readonly store: Store) {
    const params: StoryItemParams = { parent: CONSTANTS.NO_PARENT };
    this.store.dispatch(StoryActions.loadStoryItems({ params }));
  }

  generateRandomStory() {
    this.store.dispatch(StoryActions.generateMockStory());
  }

}
