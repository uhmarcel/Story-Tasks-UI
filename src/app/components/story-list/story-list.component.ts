import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../../store/selectors';
import {concatMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {getStoryId} from '../../store/reducers/story.reducer';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit, OnChanges {

  @Input() public readonly componentID: string;
  @Input() public readonly storyIDs: number[];
  @Input() public readonly showStatus = true;

  public readonly sortedIDs$: Observable<number[]>;
  private readonly inputIDs$: BehaviorSubject<number[]>;

  constructor(private readonly store: Store) {
    this.inputIDs$ = new BehaviorSubject<number[]>([]);

    // TODO: THIS IS TRASH >.> refactor into something better
    this.sortedIDs$ = this.inputIDs$.pipe(
      switchMap(ids => this.store.pipe(
        select(StorySelectors.selectAllStoryItems),
        map(stories => {
          const set = new Set<number>(ids);
          const sorted = [];

          stories.forEach(story => {
            const id = getStoryId(story);
            if (set.has(id)) {
              sorted.push(id);
              set.delete(id);
            }
          });

          for (const id of set) {
            sorted.push(id);
          }
          return sorted;
        })
      ))
    );
  }

  ngOnInit() {
    this.inputIDs$.next(this.storyIDs);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.storyIDs && changes.storyIDs.currentValue) {
      this.inputIDs$.next(changes.storyIDs.currentValue);
    }
  }

}
