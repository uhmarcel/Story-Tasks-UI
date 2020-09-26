import {createAction, props} from '@ngrx/store';
import {StoryItemUI} from '../../models/types';
// tslint:disable:max-line-length

export const createStoryComponent = createAction('[Story Item UI] Create story component', props<{ component: StoryItemUI }>());
export const updateStoryComponent = createAction('[Story Item UI] Update story component', props<{ component: StoryItemUI }>());
export const deleteStoryComponent = createAction('[Story Item UI] Delete story component', props<{ componentID: string }>());

export const loadStoryComponent = createAction('[Story Item UI] Load story component', props<{ containerID: string, storyID: number }>());
export const loadStoryComponentsByIDs = createAction('[Story Item UI] Load story components by IDs', props<{ containerID: string, storyIDs: number[] }>());
export const loadStoryComponentsSuccess = createAction('[Story Item UI] Load story components SUCCESS', props<{ components: StoryItemUI[] }>());
export const loadStoryComponentsFailure = createAction('[Story Item UI] Load story components FAILURE', props<{ error: any }>());

export const toggleIsExpanded = createAction('[Story Item UI] Toggle is expanded', props<{ componentID: string, isExpanded: boolean }>());

