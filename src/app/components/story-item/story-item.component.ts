import {Component, Input, OnInit} from '@angular/core';
import {StoryItem} from '../../models/types';
import {StoryIdPipe} from '../../pipes/story-id/story-id.pipe';
import {colorMapping} from '../../util/color-mapping';

@Component({
  selector: 'app-story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.scss']
})
export class StoryItemComponent {

  public readonly colorMap = colorMapping;
  public expanded = false;

  @Input() public story: StoryItem; // TODO: Change to story item state once store is in place
  @Input() public showStatus = true;

  constructor() {}

  toggleStory() {
    this.expanded = !this.expanded;
  }
}
