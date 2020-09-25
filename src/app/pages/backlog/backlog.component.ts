import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {filter, first, map, switchMap, tap} from 'rxjs/operators';
import {keyValue, StoryItem, StoryItemParams} from '../../models/types';
import {generateMockStory} from '../../util/generate-data';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../../store/selectors';
import {StoryActions} from '../../store/actions';
import {StoryEditorComponent} from '../../components/dialogs/story-editor/story-editor.component';
import {OktaAuthService} from '@okta/okta-angular';
import {CONSTANTS} from '../../config/constants.config';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent {

  public readonly storyIds$ = this.store.pipe(
    select(StorySelectors.selectStoryIDsByParentID(CONSTANTS.NO_PARENT))
  );

  constructor(
    private readonly store: Store,
  ) {
    const params: StoryItemParams = { parent: CONSTANTS.NO_PARENT };
    this.store.dispatch(StoryActions.loadStoryItems({ params }));
  }

  generateRandomStory() {
    this.store.dispatch(StoryActions.generateMockStory());
  }

}
