import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StoryItem, StoryItemParams } from '../models/types';
import { toRawParams } from '../util/utils';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly httpClient: HttpClient
  ) {}

  public getStoryItems(params: StoryItemParams = null) {
    const endpoint = `${environment.backendUrl}/api/v1/story`;
    return this.httpClient.get<StoryItem[]>(endpoint, { params: toRawParams(params) });
  }

  public createStoryItem(story: StoryItem) {
    const endpoint = `${environment.backendUrl}/api/v1/story`;
    return this.httpClient.post<StoryItem[]>(endpoint, story);
  }

  public updateStoryItem(story: StoryItem) {
    const endpoint = `${environment.backendUrl}/api/v1/story/${story.id}`;
    return this.httpClient.put<StoryItem[]>(endpoint, story);
  }


  // Non-definitive
  public getStoryItemsById(ids: number[]) {
    const endpoint = `${environment.backendUrl}/api/v1/story`;
    return this.httpClient.get<StoryItem[]>(endpoint, {
      params: { ids: ids.toString() }
    });
  }


}


