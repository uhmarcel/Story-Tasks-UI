import {storyReducer, StoryState} from './story.reducer';
import {storyComponentReducer, StoryComponentState} from './story-component.reducer';

export interface ApplicationState {
  storyItems: StoryState;
  storyItemComponents: StoryComponentState;
}

export const applicationReducers = {
  storyItems: storyReducer,
  storyItemComponents: storyComponentReducer
};
