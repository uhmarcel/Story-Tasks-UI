import {storyReducer, StoryState} from './story.reducer';
import {storyComponentReducer, StoryComponentState} from './story-component.reducer';
import {authReducer, AuthState} from './auth.reducer';

export interface ApplicationState {
  auth: AuthState;
  storyItems: StoryState;
  storyItemComponents: StoryComponentState;
}

export const applicationReducers = {
  auth: authReducer,
  storyItems: storyReducer,
  storyItemComponents: storyComponentReducer,
};
