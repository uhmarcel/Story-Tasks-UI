import {createFeatureSelector, createSelector} from '@ngrx/store';
import {storyAdapterSelectors, StoryState} from '../reducers/story.reducer';

export const selectStoryState = createFeatureSelector<StoryState>('storyItems');

export const selectStoryIds = createSelector(
  selectStoryState,
  storyAdapterSelectors.selectIds
);

export const selectStoryEntities = createSelector(
  selectStoryState,
  storyAdapterSelectors.selectEntities
);

export const selectAllStoryItems = createSelector(
  selectStoryState,
  storyAdapterSelectors.selectAll
);

export const selectStoryItemsCount = createSelector(
  selectStoryState,
  storyAdapterSelectors.selectTotal
);

export const selectStoryItemsByStatus = () => createSelector(
  selectAllStoryItems,
  (stories, props) => stories.filter(story => story.status === props.status)
);

