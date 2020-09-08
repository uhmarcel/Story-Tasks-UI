import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {StoryEditorDialogComponent} from '../../components/dialogs/story-editor-dialog/story-editor-dialog.component';
import {filter, map, switchMap} from 'rxjs/operators';
import {keyValue, StoryItem} from '../../models/types';
import {generateMockStory} from '../../util/generate-data';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent {

  public readonly $storyList = this.apiService.getStoryItems();
    // .pipe(
    //   map(stories => stories
    //     .sort((a, b) =>
    //       keyValue.priorities[a.priority] - keyValue.priorities[b.priority]
    //     )
    //   )
    // );

  constructor(
    private readonly apiService: ApiService,
    public dialog: MatDialog
  ) {}

  openStoryEditorDialog() {
    const dialogRef = this.dialog.open(StoryEditorDialogComponent);

    dialogRef.afterClosed().pipe(
      filter(result => result),
      switchMap(story => this.apiService.createStoryItem(story as StoryItem)),
    ).subscribe();
  }

  generateRandomStory() {
    this.$storyList.pipe(
      map(stories => {
        const set = new Set<number>();
        stories.forEach(story => set.add(story.id));
        for (let i = 0; i < stories.length; i++) {
          if (!set.has(i)) {
            return i;
          }
        }
        return stories.length;
      }),
      map(id => generateMockStory(id)),
      switchMap(story => this.apiService.createStoryItem(story))
    ).subscribe(story => window.location.reload());
  }

}
