import {createFeatureSelector, createSelector} from '@ngrx/store';
import {storyAdapterSelectors, StoryState} from '../reducers/story.reducer';
import {Status} from '../../models/types';

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
      byStatus[story.status].push(story.id);
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


export const selectAreChildStoriesLoaded = parentID => createSelector(
  selectStoryEntities,
  entities => entities[parentID].children.reduce(
    (areLoaded, childID) => areLoaded && entities[childID] != null
    , true
  ),
);

const initByStatusDictionary = () => Object.keys(Status).reduce(
  (dictionary, status) => {
    dictionary[status] = [];
    return dictionary;
  }, {}
);



