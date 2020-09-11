import {createAction, props} from '@ngrx/store';
import {StoryItem} from '../../models/types';

export const loadStoryItems = createAction('[Story Item API] Load story items');
export const loadStoryItemsSuccess = createAction('[Story Item API] Load story items SUCCESS', props<{ storyItems: StoryItem[] }>());
export const loadStoryItemsFailure = createAction('[Story Item API] Load story items FAILURE', props<{ error: any }>());

export const loadStoryItemsById = createAction('[Story Item API] Load story items by Id', props<{ ids: number[] }>());

export const createStoryItem = createAction('[Story Item API] Create story item', props<{ storyItem: StoryItem }>());
export const createStoryItemSuccess = createAction('[Story Item API] Create story item SUCCESS', props<{ storyItem: StoryItem }>());
export const createStoryItemFailure = createAction('[Story Item API] Create story item FAILURE', props<{ error: any }>());

export const generateMockStory = createAction('[Story Item DEBUG] Generate mock story');

