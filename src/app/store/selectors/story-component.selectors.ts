import {createFeatureSelector, createSelector} from '@ngrx/store';
import {storyComponentAdapterSelectors, StoryComponentState} from '../reducers/story-component.reducer';

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

export const selectStoryComponentById = (id: string) => createSelector(
  selectStoryComponentEntities,
  (entities) => entities[id]
);

export const selectIsExpanded = (id: string) => createSelector(
  selectStoryComponentById(id),
  (component) => component.isExpanded
);
