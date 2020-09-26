import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {StoryItem} from '../../models/types';
import {StoryIdPipe} from '../../pipes/story-id/story-id.pipe';
import {colorMapping} from '../../util/color-mapping';
import {select, Store} from '@ngrx/store';
import {StoryComponentSelectors, StorySelectors} from '../../store/selectors';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, filter, first, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {StoryActions, StoryComponentActions} from '../../store/actions';
import {MatSelectionListChange} from '@angular/material/list';
import {easeIn} from '../../styles/animations';
import {combineIDs} from '../../store/reducers/story-component.reducer';
import {MatExpansionPanel} from '@angular/material/expansion';

@Component({
  selector: 'app-story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.scss'],
  animations: [easeIn]
})
export class StoryItemComponent implements OnInit {

  @Input() public readonly containerID: string;
  @Input() public readonly storyID: number;
  @Input() public readonly showStatus = true;

  public componentID: string;
  public storyItem$: Observable<StoryItem>;
  public isExpanded$: Observable<boolean>;

  // public readonly colorMap = colorMapping;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.componentID = combineIDs(this.containerID, this.storyID);

    this.store.dispatch(
      StoryComponentActions.loadStoryComponent({ containerID: this.containerID, storyID: this.storyID })
    );

    this.storyItem$ = this.store.pipe(
      select(StorySelectors.selectStoryItemByID(this.storyID))
    );

    this.isExpanded$ = this.store.pipe(
      select(StoryComponentSelectors.selectIsExpanded(this.componentID))
    );

    this.isExpanded$.subscribe(x => console.log(this.componentID));


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
    this.store.dispatch(
      StoryComponentActions.toggleIsExpanded({ componentID: this.componentID, isExpanded })
    );
  }
}
