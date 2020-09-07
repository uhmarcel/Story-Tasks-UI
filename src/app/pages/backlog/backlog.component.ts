import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {StoryEditorDialogComponent} from '../../components/dialogs/story-editor-dialog/story-editor-dialog.component';
import {filter, first, map, switchMap} from 'rxjs/operators';
import {StoryItem} from '../../models/types';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent {

  public readonly $storyList = this.apiService.getStoryItems();

  constructor(
    private readonly apiService: ApiService,
    public dialog: MatDialog
  ) {}

  openStoryEditorDialog() {
    const dialogRef = this.dialog.open(StoryEditorDialogComponent);

    dialogRef.afterClosed().pipe(
      filter(result => result),
      switchMap(story => this.apiService.createStoryItem(story as StoryItem)),
    ).subscribe(story => console.log('Created story', story));
  }

}
