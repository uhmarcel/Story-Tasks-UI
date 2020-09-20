import {createAction, props} from '@ngrx/store';
import {Status, StoryItem, StoryItemParams, Task} from '../../models/types';
// tslint:disable:max-line-length

export const loadStoryItems = createAction('[Story Item API] Load story items', props<{ params?: StoryItemParams }>());
export const loadStoryItemsByID = createAction('[Story Item API] Load story items by ID', props<{ ids: number[] }>());
export const loadStoryItemsByParentID = createAction('[Story Item API] Load story items by parent ID', props<{ parentID: number }>());
export const loadStoryItemsSuccess = createAction('[Story Item API] Load story items SUCCESS', props<{ storyItems: StoryItem[] }>());
export const loadStoryItemsFailure = createAction('[Story Item API] Load story items FAILURE', props<{ error: any }>());

export const createStoryItem = createAction('[Story Item API] Create story item', props<{ storyItem: StoryItem }>());
export const createStoryItemSuccess = createAction('[Story Item API] Create story item SUCCESS', props<{ storyItems: StoryItem[] }>());
export const createStoryItemFailure = createAction('[Story Item API] Create story item FAILURE', props<{ error: any }>());

export const updateStoryItem = createAction('[Story Item API] Update story item', props<{ storyItem: StoryItem }>());
export const updateStoryItemTask = createAction('[Story Item API] Update story task', props<{ storyID: number, taskID: string, task: Task }>());
export const updateStoryItemStatus = createAction('[Story Item API] Update story status', props<{ storyID: number, status: Status }>());
export const updateStoryItemSuccess = createAction('[Story Item API] Update story item SUCCESS', props<{ storyItems: StoryItem[] }>());
export const updateStoryItemFailure = createAction('[Story Item API] Update story item FAILURE', props<{ error: any }>());

export const openStoryEditor = createAction('[Story Item Editor] Open story item editor', props<{ storyItem?: StoryItem }>());

export const generateMockStory = createAction('[Story Item DEBUG] Generate mock story');

export const noopAction = createAction('[General] Do nothing');
