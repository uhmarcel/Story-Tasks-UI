import {storyReducer, StoryState} from './story.reducer';

export interface ApplicationState {
  storyItems: StoryState;
}

export const applicationReducers = {
  storyItems: storyReducer
};
