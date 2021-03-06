import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {StoryItem, StoryItemParams, toRawParams} from '../models';
import {getStoryId} from '../store/reducers/story.reducer';
import {ConfigService} from './config.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService
  ) {}

  public getStoryItems(params: StoryItemParams = null) {
    const endpoint = `${this.getBackendUrl()}/api/v1/stories`;
    return this.httpClient.get<StoryItem[]>(endpoint, { params: toRawParams(params) });
  }

  public createStoryItem(story: StoryItem) {
    const endpoint = `${this.getBackendUrl()}/api/v1/stories`;
    return this.httpClient.post<StoryItem[]>(endpoint, story);
  }

  public updateStoryItem(story: StoryItem) {
    const endpoint = `${this.getBackendUrl()}/api/v1/stories/${getStoryId(story)}`;
    return this.httpClient.put<StoryItem[]>(endpoint, story);
  }

  public deleteStoryItem(id: number) {
    const endpoint = `${this.getBackendUrl()}/api/v1/stories/${id}`;
    return this.httpClient.delete<StoryItem[]>(endpoint);
  }

  // Non-definitive
  public getStoryItemsById(ids: number[]) {
    const endpoint = `${this.getBackendUrl()}/api/v1/stories`;
    return this.httpClient.get<StoryItem[]>(endpoint, {
      params: { ids: ids.toString() }
    });
  }

  private getBackendUrl(): string {
    return this.configService.getConfig('backendUrl');
  }

}
