import {createFeatureSelector, createSelector} from '@ngrx/store';
import {storyComponentAdapterSelectors, StoryComponentState} from '../reducers/story-component.reducer';
import {composeComponentID, StoryItemUI} from '../../models';

export const selectStoryComponentState = createFeatureSelector<StoryComponentState>('storyItemComponents');

export const selectStoryComponentIds = createSelector(
  selectStoryComponentState,
  storyComponentAdapterSelectors.selectIds
);

export const selectStoryComponentEntities = createSelector(
  selectStoryComponentState,
  storyComponentAdapterSelectors.selectEntities
);

export const selectAllStoryComponents = createSelector(
  selectStoryComponentState,
  storyComponentAdapterSelectors.selectAll
);

export const selectStoryComponentCount = createSelector(
  selectStoryComponentState,
  storyComponentAdapterSelectors.selectTotal
);

export const selectStoryComponentById = (containerID: string, storyID: number) => createSelector(
  selectStoryComponentEntities,
  (entities) => {
    const componentID = composeComponentID(containerID, storyID);
    return entities[componentID]
      ? entities[componentID]
      : new StoryItemUI(containerID, storyID, null);
  }
);

export const selectIsExpanded = (containerID: string, storyID) => createSelector(
  selectStoryComponentById(containerID, storyID),
  (component) => component.isExpanded
);
