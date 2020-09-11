
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../services/api.service';
import {Injectable} from '@angular/core';
import {catchError, concatMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {StoryActions} from '../actions';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../selectors';
import {generateMockStory} from '../../util/generate-data';

@Injectable()
export class StoryEffects {

  logActions$ = createEffect(() =>
    this.actions$.pipe(
      tap(action => console.log(action))
    ), { dispatch: false }
  );


  loadStories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.loadStoryItems),
      switchMap(() => this.apiService.getStoryItems()),
      map(storyItems => StoryActions.loadStoryItemsSuccess({ storyItems })),
      catchError(error => of(StoryActions.loadStoryItemsFailure({ error })))
    )
  );

  createStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.createStoryItem),
      switchMap(({ storyItem }) => this.apiService.createStoryItem(storyItem)),
      map(storyItem => StoryActions.createStoryItemSuccess({ storyItem })),
      catchError(error => of(StoryActions.createStoryItemFailure({ error })))
    )
  );

  generateMockStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.generateMockStory),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(StorySelectors.selectStoryIds)))
      )),
      map(([, ids]) => StoryActions.createStoryItem({
        storyItem: generateMockStory(null, ids as number[])
      })),
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiService,
    private readonly store: Store
  ) {}
}
