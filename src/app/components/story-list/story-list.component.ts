import {Component, Input} from '@angular/core';
import {StoryItem} from '../../models/types';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent {

  @Input() public readonly storyList: StoryItem[] = [];

  constructor() {}

}
