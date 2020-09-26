import {createAction, props} from '@ngrx/store';
import {StoryItemParams, StoryItemUI} from '../../models/types';

export const loadStoryComponent = createAction('[Story Item UI] Load story component', props<{ containerID: string, storyID: number }>());
export const createStoryComponent = createAction('[Story Item UI] Create story component', props<{ component: StoryItemUI }>());
export const updateStoryComponent = createAction('[Story Item UI] Update story component', props<{ component: StoryItemUI }>());
export const deleteStoryComponent = createAction('[Story Item UI] Delete story component', props<{ componentID: string }>());

export const toggleIsExpanded = createAction('[Story Item UI] Toggle is expanded', props<{ componentID: string, isExpanded: boolean }>());

