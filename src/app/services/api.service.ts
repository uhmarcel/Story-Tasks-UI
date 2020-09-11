import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Status, StoryItem} from '../models/types';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly hostUrl = environment.backendHostUrl;

  constructor(
    private readonly httpClient: HttpClient
  ) {}

  public getStoryItems() {
    const endpoint = this.hostUrl + '/api/v1/story';
    return this.httpClient.get<StoryItem[]>(endpoint);
  }

  public getStoryItemsByStatus(status: Status) {
    const endpoint = this.hostUrl + '/api/v1/story';
    return this.httpClient.get<StoryItem[]>(endpoint).pipe(map(stories => stories.filter(story => story.status === status)));
  }

  public createStoryItem(story: StoryItem) {
    const endpoint = this.hostUrl + '/api/v1/story';
    return this.httpClient.post<StoryItem>(endpoint, story);
  }

}


