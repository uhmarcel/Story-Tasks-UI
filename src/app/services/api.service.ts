import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {StoryItem, StoryItemParams, toRawParams} from '../models';
import {getStoryId} from '../store/reducers/story.reducer';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly httpClient: HttpClient
  ) {}

  public getStoryItems(params: StoryItemParams = null) {
    const endpoint = `${environment.backendUrl}/api/v1/stories`;
    return this.httpClient.get<StoryItem[]>(endpoint, { params: toRawParams(params) });
  }

  public createStoryItem(story: StoryItem) {
    const endpoint = `${environment.backendUrl}/api/v1/stories`;
    return this.httpClient.post<StoryItem[]>(endpoint, story);
  }

  public updateStoryItem(story: StoryItem) {
    const endpoint = `${environment.backendUrl}/api/v1/stories/${getStoryId(story)}`;
    return this.httpClient.put<StoryItem[]>(endpoint, story);
  }

  public deleteStoryItem(id: number) {
    const endpoint = `${environment.backendUrl}/api/v1/stories/${id}`;
    return this.httpClient.delete<StoryItem[]>(endpoint);
  }



  // Non-definitive
  public getStoryItemsById(ids: number[]) {
    const endpoint = `${environment.backendUrl}/api/v1/stories`;
    return this.httpClient.get<StoryItem[]>(endpoint, {
      params: { ids: ids.toString() }
    });
  }


}


