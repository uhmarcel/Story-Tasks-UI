import {createAction, props} from '@ngrx/store';
import {StoryItemUI} from '../../models';
// tslint:disable:max-line-length

export const createStoryComponent = createAction('[Story Item UI] Create story component', props<{ component: StoryItemUI }>());
export const updateStoryComponent = createAction('[Story Item UI] Update story component', props<{ component: StoryItemUI }>());
export const deleteStoryComponent = createAction('[Story Item UI] Delete story component', props<{ componentID: string }>());

