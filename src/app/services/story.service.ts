import {Injectable} from '@angular/core';
import {Status, StoryItem} from '../models/types';
import {Observable, of, throwError} from 'rxjs';
import {concatMap, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private readonly store: Store) {}

  public validateStoryItem(storyItem: StoryItem): Observable<StoryItem> {
    return of(storyItem);
  }
}
