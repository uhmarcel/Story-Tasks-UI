import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {first, map, tap} from 'rxjs/operators';
import {keyValue, Status, StoryItem, typeKeys} from '../../models/types';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../../store/selectors';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {StoryActions} from '../../store/actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  public readonly storiesByStatus$ = this.store.pipe(
    select(StorySelectors.selectStoryIDsGroupByStatus),
  );

  public readonly STATUS_KEYS = Object.keys(Status);

  constructor(private readonly store: Store) {
    this.store.dispatch(StoryActions.loadStoryItems({}));
  }

  dropStory(event: CdkDragDrop<any>) {
    const prevStatus = event.previousContainer.data;
    const status = event.container.data;
    const storyIndex = event.previousIndex;

    this.storiesByStatus$.pipe(
      map(storyIDs => storyIDs[prevStatus][storyIndex]),
      first()
    ).subscribe(storyID => this.store.dispatch(
      StoryActions.updateStoryStatus({ storyID, status }))
    );
  }

}

