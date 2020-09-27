import {createFeatureSelector, createSelector} from '@ngrx/store';
import {getStoryId, storyAdapterSelectors, StoryState} from '../reducers/story.reducer';
import {Status} from '../../models';

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

export const selectIsLoading = createSelector(
  selectStoryState,
  (state) => state.isLoading
);

export const selectStoryItemsGroupByStatus = createSelector(
  selectAllStoryItems,
  stories => stories.reduce(
    (byStatus, story) => {
      byStatus[story.status].push(story);
      return byStatus;
    },
    initByStatusDictionary()
  )
);

export const selectStoryIDsGroupByStatus = createSelector(
  selectAllStoryItems,
  stories => stories.reduce(
    (byStatus, story) => {
      byStatus[story.status].push(getStoryId(story));
      return byStatus;
    },
    initByStatusDictionary()
  )
);

export const selectStoryItemByID = (id: number) => createSelector(
  selectStoryEntities,
  storyEntities => storyEntities[id]
);

export const selectStoryItemsByID = (ids: number[]) => createSelector(
  selectStoryEntities,
  entities => ids.map(id => entities[id])
);

export const selectStoryItemsByStatus = (status: Status) => createSelector(
  selectStoryItemsGroupByStatus,
  storiesByStatus => storiesByStatus[status]
);

export const selectStoryIDsByStatus = (status: Status) => createSelector(
  selectStoryIDsGroupByStatus,
  storiesByStatus => storiesByStatus[status]
);

export const selectStoryIDsByParentID = (parentID: number) => createSelector(
  selectAllStoryItems,
  (stories) => stories
    .filter(story => story.parent === parentID)
    .map(story => story.identifier.referenceId),

);

// TODO: Refactor - Maybe to its own service?
export const selectAreChildStoriesLoaded = parentID => createSelector(
  selectStoryEntities,
  entities => entities[parentID].children.reduce(
    (areLoaded, childID) => areLoaded && entities[childID] != null
    , true
  ),
);

const initByStatusDictionary = () => Object
  .keys(Status)
  .reduce((dictionary, status) => {
    dictionary[status] = [];
    return dictionary;
  }, {});



