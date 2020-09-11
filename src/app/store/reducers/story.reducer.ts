import { createReducer, on } from '@ngrx/store';
import {Status, StoryItem} from '../../models/types';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import * as StoryActions from '../actions/story.actions';

export interface StoryState extends EntityState<StoryItem> {
    isLoading: boolean;
    error?: any;
}

export const storyAdapter: EntityAdapter<StoryItem> = createEntityAdapter<StoryItem>({
  selectId: story => story?.id
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
  on(StoryActions.createStoryItemSuccess, (state, { storyItem }) => {
    const nextState = storyAdapter.upsertOne(storyItem, state);
    return nextState;
  })
);

export const storyAdapterSelectors = storyAdapter.getSelectors();
