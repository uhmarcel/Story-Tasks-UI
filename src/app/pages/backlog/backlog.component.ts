import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {StoryEditorDialogComponent} from '../../components/dialogs/story-editor-dialog/story-editor-dialog.component';
import {filter, first, map, switchMap, tap} from 'rxjs/operators';
import {keyValue, StoryItem} from '../../models/types';
import {generateMockStory} from '../../util/generate-data';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../../store/selectors';
import {StoryActions} from '../../store/actions';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent {

  public ids: number[] = [];

  public readonly storyItems$ = this.store.pipe(select(StorySelectors.selectAllStoryItems));

  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService,
    public dialog: MatDialog
  ) {
    this.store.dispatch(StoryActions.loadStoryItems());
  }

  openStoryEditorDialog() {
    const dialogRef = this.dialog.open(StoryEditorDialogComponent);

    dialogRef.afterClosed().pipe(
      filter(result => result),
      first()
    ).subscribe(story => this.store.dispatch(StoryActions.createStoryItem({ storyItem: story })));
  }

  generateRandomStory() {
    this.store.dispatch(StoryActions.generateMockStory());
  }

}
