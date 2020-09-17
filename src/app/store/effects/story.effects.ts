
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
import {StoryEditorDialogComponent} from '../../components/dialogs/story-editor-dialog/story-editor-dialog.component';

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

  // TODO: BIG TIME!! Update to use MERGEMAP / CONCATMAP


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
      tap(x => console.log('1')),
      mergeMap(({ storyItem }) => of(storyItem).pipe(
        switchMap(story => this.storyService.validateStoryItem(story)),
        switchMap(story => this.apiService.updateStoryItem(story)),
        map(updatedStories => StoryActions.updateStoryItemSuccess({ storyItems: updatedStories })),
        catchError(error => of(StoryActions.updateStoryItemFailure({ error })))
      ))
    )
  );


//
// ,
//       tap(x => console.log('2')),
//       switchMap(storyItem => this.apiService.updateStoryItem(storyItem)),
//       tap(x => console.log('3')),
//       map(updatedStories => StoryActions.updateStoryItemSuccess({ storyItems: updatedStories })),
//       tap(x => console.log('4')),
//       catchError(error => of(StoryActions.updateStoryItemFailure({ error })))
//     ),


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


  // TODO: Move / allocate - debug

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

  openStoryEditor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.openStoryEditor),
      mergeMap(({ storyItem }) => of(storyItem).pipe(
        switchMap(story => this.dialog.open(StoryEditorDialogComponent, { data: story }).afterClosed()),
        switchMap(editedStory => this.storyService.validateStoryItem(editedStory)),
        map(editedStory => editedStory
          ? StoryActions.createStoryItem({ storyItem: editedStory })
          : StoryActions.noopAction()
        ),
        catchError(error => of(StoryActions.loadStoryItemsFailure({ error })))
      ))
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


/*
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InboxActions.loadItemsByStatus),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(getListItemParams),
            this.store.select(selectFilterParams)
          )
        )
      ),
      mergeMap(([{ status }, itemParams, filterParams]) =>
        forkJoin({
          items: this.apiService.getListItems({
            ...itemParams,
            ...filterParams,
            status,
          }),
          count: this.apiService.getItemCountByStatus(status as Status),
        }).pipe(
          mergeMap(({ items, count }) => [
            InboxActions.updateCountByStatus({ count, status }),
            InboxActions.loadItemsByStatusSuccess({ items, status }),
          ]),
          catchError((error) =>
            of(
              InboxActions.loadItemsByStatusFailure({
                status,
                error:
                  error instanceof HttpErrorResponse && error.status === 401
                    ? 'unauthorized'
                    : 'list_error',
              })
            )
          )
        )
      )
    )
  );
 */
