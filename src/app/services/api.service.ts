import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {StoryItem} from '../models/types';


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

  public createStoryItem(story: StoryItem) {
    const endpoint = this.hostUrl + '/api/v1/story';
    return this.httpClient.post(endpoint, story);
  }

}


