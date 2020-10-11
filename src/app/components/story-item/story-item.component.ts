import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {composeComponentID, StoryItem, StoryItemState} from '../../models';
import {colorMapping} from '../../util/color-mapping';
import {select, Store} from '@ngrx/store';
import {StoryComponentSelectors, StorySelectors} from '../../store/selectors';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {delay, distinctUntilChanged, filter, first, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {StoryActions, StoryComponentActions} from '../../store/actions';
import {MatSelectionListChange} from '@angular/material/list';
import {easeIn} from '../../styles/animations';

@Component({
  selector: 'app-story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.scss'],
  animations: [easeIn]
})
export class StoryItemComponent implements OnInit {

  // TODO: Make all input observables
  @Input() public readonly containerID: string;
  @Input() public readonly storyID: number;
  @Input() public readonly showStatus = true;

  public componentID: string;
  public storyItem$: Observable<StoryItem>;
  public isExpanded$: Observable<boolean>;
  public initialIsExpanded$: Observable<boolean>;
  private expandedChange$: BehaviorSubject<boolean>;

  // public readonly colorMap = colorMapping;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.componentID = composeComponentID(this.containerID, this.storyID);

    this.expandedChange$ = new BehaviorSubject(null);

    this.storyItem$ = this.store.pipe(
      select(StorySelectors.selectStoryItemByID(this.storyID))
    );

    this.isExpanded$ = this.store.pipe(
      select(StoryComponentSelectors.selectIsExpanded(this.containerID, this.storyID)),
    );

    this.initialIsExpanded$ = combineLatest([ this.isExpanded$, this.storyItem$ ]).pipe(
      filter(([ isExpanded, storyItem ]) => !!isExpanded && !!storyItem),
      map(([ isExpanded ]) => isExpanded),
      first(),
      delay(500),
    );

    this.expandedChange$.pipe(
      withLatestFrom(this.isExpanded$),
      filter(([ change, isExpanded ]) => change != null && change !== isExpanded),
      map(([ nextIsExpanded ]) => nextIsExpanded)
    ).subscribe(isExpanded => {
      this.store.dispatch(
        StoryComponentActions.updateStoryComponent({
          component: {
            containerID: this.containerID,
            storyID: this.storyID,
            isExpanded
          } as StoryItemState
        })
      );
    });

    // TODO: Refactor loading logic once story item component state is implemented
    this.isExpanded$.pipe(
      filter(expanded => expanded === true),

      first()
    ).subscribe(() =>
      this.store.dispatch(StoryActions.loadStoryItemsByParentID({
        parentID: this.storyID
      }))
    );
  }

  onTaskChange(change: MatSelectionListChange) {
    const done = change.option.selected;
    const task = change.option.value;

    setTimeout(() =>
      this.store.dispatch(StoryActions.updateStoryItemTask({
        storyID: this.storyID,
        taskID: task.id,
        task: { ...task, done }
      })),
      500
    );
  }

  openEditor(story: StoryItem) {
    this.store.dispatch(StoryActions.openStoryEditor({ storyItem: story }));
  }

  toggleExpansion(isExpanded: boolean) {
    this.expandedChange$.next(isExpanded);
  }
}
