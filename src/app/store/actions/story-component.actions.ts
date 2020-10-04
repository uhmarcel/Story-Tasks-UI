import {createAction, props} from '@ngrx/store';
import {StoryItemState} from '../../models';
// tslint:disable:max-line-length

export const createStoryComponent = createAction('[Story Item UI] Create story component', props<{ component: StoryItemState }>());
export const updateStoryComponent = createAction('[Story Item UI] Update story component', props<{ component: StoryItemState }>());
export const deleteStoryComponent = createAction('[Story Item UI] Delete story component', props<{ componentID: string }>());

