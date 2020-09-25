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

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent {

  public ids: number[] = [];

  public readonly storyIds$ = this.store.pipe(select(StorySelectors.selectStoryIds));

  constructor(
    private readonly store: Store,
    public dialog: MatDialog
  ) {
    const params: StoryItemParams = { parent: -1 };
    this.store.dispatch(StoryActions.loadStoryItems({ params }));
  }

  generateRandomStory() {
    this.store.dispatch(StoryActions.generateMockStory());
  }

}
