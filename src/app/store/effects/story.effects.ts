
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../services/api.service';
import {Injectable} from '@angular/core';
import {catchError, concatMap, delay, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {StoryActions} from '../actions';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../selectors';
import {generateMockStory} from '../../util/generate-data';
import {StoryService} from '../../services/story.service';

@Injectable()
export class StoryEffects {

  logActions$ = createEffect(() =>
    this.actions$.pipe(
      tap(action => {
        const { type, ...payload } = action;
        console.log({ type }, payload);
      })
    ), { dispatch: false }
  );


  loadStories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.loadStoryItems),
      switchMap(({ params }) => this.apiService.getStoryItems(params)),
      map(storyItems => StoryActions.loadStoryItemsSuccess({ storyItems })),
      catchError(error => of(StoryActions.loadStoryItemsFailure({ error })))
    )
  );

  loadStoriesByID$ = createEffect(() => // TODO: Remove if not used
    this.actions$.pipe(
      ofType(StoryActions.loadStoryItemsByID),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(StorySelectors.selectStoryIds)))
      )),
      map(([action, existingIds]) => action.ids.filter(id => !(existingIds as number[]).includes(id))),
      filter(ids => ids.length > 0),
      switchMap(ids => this.apiService.getStoryItemsById(ids)),
      map(storyItems => StoryActions.loadStoryItemsSuccess({ storyItems })),
      catchError(error => of(StoryActions.loadStoryItemsFailure({ error })))
    )
  );

  loadStoriesByParentID = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.loadStoryItemsByParentID),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(StorySelectors.selectAreChildStoriesLoaded(action.parentID)))
      )),
      tap(console.log),
      filter(([_, areLoaded]) => areLoaded === false),
      tap(console.log),
      switchMap(([{ parentID }, _]) => this.apiService.getStoryItems({ parent: parentID })),
      map(storyItems => StoryActions.loadStoryItemsSuccess({ storyItems })),
      catchError(error => of(StoryActions.loadStoryItemsFailure({ error })))
    )
  );

  createStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.createStoryItem),
      switchMap(({ storyItem }) => this.apiService.createStoryItem(storyItem)),
      map(storyItems => StoryActions.createStoryItemSuccess({ storyItems })),
      catchError(error => of(StoryActions.createStoryItemFailure({ error })))
    )
  );

  updateStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.updateStoryItem),
      switchMap(({ storyItem }) => this.storyService.validateStoryItem(storyItem)),
      switchMap(storyItem => this.apiService.updateStoryItem(storyItem)),
      map(updatedStories => StoryActions.updateStoryItemSuccess({ storyItems: updatedStories })),
      catchError(error => of(StoryActions.updateStoryItemFailure({ error })))
    )
  );

  updateStoryStatus$  = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.updateStoryStatus),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(StorySelectors.selectStoryItemByID(action.storyID)))
      )),
      map(([{ status }, story]) => ({ ...story, status })),
      map(updatedStory => StoryActions.updateStoryItem({ storyItem: updatedStory })),
      catchError(error => of(StoryActions.updateStoryItemFailure({ error })))
    )
  );

  updateStoryTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.updateStoryTask),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(StorySelectors.selectStoryItemByID(action.storyID)))
      )),
      map(([{ task }, story]) => ({
        ...story,
        tasks: story.tasks.map(prevTask => (prevTask.id === task.id) ? task : prevTask)
      })),
      map(updatedStory => StoryActions.updateStoryItem({ storyItem: updatedStory })),
      catchError(error => of(StoryActions.updateStoryItemFailure({ error })))
    )
  );


  // TODO: Move from store
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
    private readonly storyService: StoryService,
    private readonly store: Store
  ) {}
}
