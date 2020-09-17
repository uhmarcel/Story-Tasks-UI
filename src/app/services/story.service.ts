import {Injectable} from '@angular/core';
import {Status, StoryItem} from '../models/types';
import {Observable, of, throwError} from 'rxjs';
import {catchError, concatMap, filter, first, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private readonly store: Store) {}

  public validateStoryItem(toValidate: StoryItem): Observable<StoryItem> {
    return of(toValidate);
    // return of(toValidate).pipe(
    //   filter(story => story != null),
    //   concatMap(story => of(story).pipe(
    //     withLatestFrom(
    //       this.store.select(StorySelectors.selectStoryItemsByID(story.children))
    //     )
    //   )),
    //   map(([story, children]) => {
    //     switch (story?.status) {
    //       case Status.ANALYSIS:
    //       case Status.TODO:
    //       case Status.IN_PROGRESS:
    //         break;
    //       case Status.DONE:
    //         const tasksDone = story.tasks?.reduce((allDone, task) => allDone && task.done, true);
    //         const childrenDone = children?.reduce((allDone, child) => allDone && child.status === Status.DONE, true);
    //         if (!tasksDone || !childrenDone) {
    //           throw new Error(`Unable to move story to done: Story has tasks yet to be completed`);
    //         }
    //         break;
    //       default:
    //         break;
    //     }
    //     return story;
    //   })
    // );
  }

}
