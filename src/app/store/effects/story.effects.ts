
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../services/api.service';
import {Injectable} from '@angular/core';
import {catchError, concatMap, delay, filter, first, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {defer, of, throwError} from 'rxjs';
import {StoryActions} from '../actions';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../selectors';
import {generateMockStory} from '../../util/generate-data';
import {StoryService} from '../../services/story.service';
import {MatDialog} from '@angular/material/dialog';
import {StoryEditorComponent} from '../../components/dialogs/story-editor/story-editor.component';

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

  logError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.updateStoryItemFailure),
      tap(({error}) => alert(error))
    ), { dispatch: false }
  );

  // TODO: Urgent!! Update to use MERGEMAP / CONCATMAP
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
      filter(([_, areLoaded]) => areLoaded === false),
      mergeMap(([{ parentID }]) => this.apiService.getStoryItems({ parent: parentID }).pipe(
        map(storyItems => StoryActions.loadStoryItemsSuccess({ storyItems })),
        catchError(error => of(StoryActions.loadStoryItemsFailure({ error })))
      ))
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
      mergeMap(({ storyItem }) => of(storyItem).pipe(
        switchMap(story => this.storyService.validateStoryItem(story)),
        switchMap(story => this.apiService.updateStoryItem(story)),
        map(updatedStories => StoryActions.updateStoryItemSuccess({ storyItems: updatedStories })),
        catchError(error => of(StoryActions.updateStoryItemFailure({ error })))
      ))
    )
  );

  updateStoryStatus$  = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.updateStoryItemStatus),
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
      ofType(StoryActions.updateStoryItemTask),
      concatMap(action  => of(action).pipe(
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

  deleteStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.deleteStoryItem),
      mergeMap(({ storyID }) => of(storyID).pipe(
        switchMap(id => this.apiService.deleteStoryItem(id)),
        map(storyItems => StoryActions.deleteStoryItemSuccess({ storyID, storyItems })),
        catchError(error => of(StoryActions.deleteStoryItemFailure({ error })))
      ))
    )
  );

  openStoryEditor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.openStoryEditor),
      tap( ({ storyItem }) => this.dialog.open(StoryEditorComponent, { data: storyItem })),
    ), {
    dispatch: false
  });


  // TODO: Move / relocate - debug

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
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {}
}
