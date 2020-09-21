import {Component, Input, OnInit} from '@angular/core';
import {StoryItem} from '../../models/types';
import {StoryIdPipe} from '../../pipes/story-id/story-id.pipe';
import {colorMapping} from '../../util/color-mapping';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../../store/selectors';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, filter, first, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {StoryActions} from '../../store/actions';
import {MatSelectionListChange} from '@angular/material/list';
import {easeIn} from '../../styles/animations';

@Component({
  selector: 'app-story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.scss'],
  animations: [easeIn]
})
export class StoryItemComponent implements OnInit {

  @Input() public readonly storyID: number;
  @Input() public readonly showStatus = true;

  public storyItem$: Observable<StoryItem>;
  public expanded$: BehaviorSubject<boolean>;

  // public readonly colorMap = colorMapping;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.expanded$ = new BehaviorSubject<boolean>(false);

    this.storyItem$ = this.store.pipe(
      select(StorySelectors.selectStoryItemByID(this.storyID))
    );

    this.expanded$.pipe(
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

  debug(story: StoryItem) {
    this.store.dispatch(StoryActions.openStoryEditor({ storyItem: story }));
  }
}
