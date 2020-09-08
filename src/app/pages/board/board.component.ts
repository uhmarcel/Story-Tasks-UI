import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {first, map, tap} from 'rxjs/operators';
import {keyValue, StoryItem, typeKeys} from '../../models/types';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  public readonly storiesByStatus: Record<string, StoryItem[]>;
  public readonly typeKeys = typeKeys;

  constructor(private readonly apiService: ApiService) {
    this.storiesByStatus = {};
    typeKeys.statuses.forEach(status => this.storiesByStatus[status] = []);

    this.apiService.getStoryItems().pipe(
      map(stories => stories.sort((a, b) => keyValue.priorities[a.priority] - keyValue.priorities[b.priority])),
      tap(stories => stories.forEach(story => this.storiesByStatus[story.status].push(story))),
      first()
    ).subscribe();
  }

}
