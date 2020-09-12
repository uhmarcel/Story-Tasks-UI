import {Component, Input, OnInit} from '@angular/core';
import {StoryItem} from '../../models/types';
import {StoryIdPipe} from '../../pipes/story-id/story-id.pipe';
import {colorMapping} from '../../util/color-mapping';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../../store/selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.scss']
})
export class StoryItemComponent implements OnInit {


  @Input() public story: StoryItem; // TODO: Change to story item state once store is in place
  @Input() public showStatus = true;

  public childStories$: Observable<StoryItem[]>;
  public isExpanded = false;

  public readonly colorMap = colorMapping;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    // this.store.dispatch(loadStoryItemsById({ ids: story.children }));
    this.childStories$ = this.store.pipe(select(StorySelectors.selectStoryItemsById, { ids: this.story.children }));

  }

}
