import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../services/api.service';
import {StoryService} from '../../services/story.service';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';
import {StoryComponentActions} from '../actions';
import {map} from 'rxjs/operators';
import {StoryItemUI} from '../../models/types';
import {combineIDs} from '../reducers/story-component.reducer';

@Injectable()
export class StoryComponentEffects {

  loadAsync$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryComponentActions.loadStoryComponent),
      map(({ containerID, storyID }) => {
        const component: StoryItemUI = JSON.parse(localStorage.getItem(combineIDs(containerID, storyID)));
        return component ? component : ({ containerID, storyID, isExpanded: false }) as StoryItemUI;
      }),
      map(component => StoryComponentActions.createStoryComponent({ component }))
    )
  );


  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiService,
    private readonly store: Store,
  ) {}

}
