import { createReducer, on } from '@ngrx/store';
import {keyValue, Status, statusMap, StoryItem} from '../../models/types';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import * as StoryActions from '../actions/story.actions';

export interface StoryState extends EntityState<StoryItem> {
    isLoading: boolean;
    error?: any;
}

export const selectItemId = (item: StoryItem): number => item?.identifier?.referenceId;

export const sortByPriority = (a: StoryItem, b: StoryItem) => {
  return keyValue.statuses[a.status] !== keyValue.statuses[b.status]
    ? keyValue.statuses[a.status] - keyValue.statuses[b.status]
    : keyValue.priorities[a.priority] - keyValue.priorities[b.priority];
};


export const storyAdapter: EntityAdapter<StoryItem> = createEntityAdapter<StoryItem>({
  selectId: selectItemId,
  sortComparer: sortByPriority
});

export const initialStoryState = storyAdapter.getInitialState({
  isLoading: false,
  error: null,
});


export const storyReducer = createReducer<StoryState>(
  initialStoryState,
  on(StoryActions.loadStoryItems, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(StoryActions.loadStoryItemsSuccess, (state, { storyItems }) => {
    const nextState = storyAdapter.upsertMany(storyItems, state);

    return {
      ...nextState,
      isLoading: false,
      error: null,
    };
  }),
  on(StoryActions.loadStoryItemsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(StoryActions.createStoryItemSuccess, (state, { storyItems }) => {
    const nextState = storyAdapter.upsertMany(storyItems, state);
    return nextState;
  }),
  on(StoryActions.updateStoryItemSuccess, (state, { storyItems }) => {
    const nextState = storyAdapter.upsertMany(storyItems, state);
    return nextState;
  }),
  on(StoryActions.deleteStoryItemSuccess, (state, { storyID, storyItems }) => {
    const nextState = storyAdapter.upsertMany(
      storyItems,
      storyAdapter.removeOne(storyID, state)
    );
    return nextState;
  }),
);

export const storyAdapterSelectors = storyAdapter.getSelectors();
