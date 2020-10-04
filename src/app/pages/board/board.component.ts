import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {first, map, tap} from 'rxjs/operators';
import {keyValue, MenuItem, Status, StoryItem, typeKeys} from '../../models';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../../store/selectors';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {StoryActions} from '../../store/actions';

export const BOARD_PAGE_MENU_ITEM: MenuItem = {
  route: '/board',
  title: 'Board'
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  public readonly storiesByStatus$ = this.store.pipe(
    select(StorySelectors.selectStoryIDsGroupByStatus)
  );

  public readonly STATUS_KEYS = Object.keys(Status).filter(status => status !== Status.ANALYSIS);

  constructor(private readonly store: Store) {
    this.store.dispatch(StoryActions.loadStoryItems({}));
  }

  dropStory(event: CdkDragDrop<any>) {
    if (event.previousContainer.id === event.container.id) { return; }
    const status = event.container.data;
    const storyID = event.item.data;

    this.store.dispatch(
      StoryActions.updateStoryItemStatus({ storyID, status })
    );
  }

}

