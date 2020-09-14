import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {StoryItem} from '../../models/types';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../../store/selectors';
import {map, tap, withLatestFrom} from 'rxjs/operators';
import {StoryActions} from '../../store/actions';
import {BehaviorSubject, Observable} from 'rxjs';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  @Input() public readonly storyIDs: number[] = [];
  @Input() public readonly showStatus = true;
  @Input() public readonly connectedID: string = null;

  public CONNECTED_TO = ['list-analysis', 'list-todo', 'list-progress', 'list-done'];

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.CONNECTED_TO = ['list-analysis', 'list-todo', 'list-progress', 'list-done']
      .filter(list => list !== this.connectedID);
  }

  drop(event: CdkDragDrop<number[], any>) {
    console.log(event.previousContainer.id, '->', event.container.id);
  }



}
