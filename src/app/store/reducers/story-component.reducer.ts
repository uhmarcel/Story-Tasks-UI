// Story Component State

import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {selectComponentID, StoryItem, StoryItemUI} from '../../models';
import {createReducer, on} from '@ngrx/store';
import {StoryComponentActions} from '../actions';

export interface StoryComponentState extends EntityState<StoryItemUI> {}

export const storyComponentAdapter: EntityAdapter<StoryItemUI> = createEntityAdapter<StoryItemUI>({
  selectId: selectComponentID
});

export const initialStoryComponentState = storyComponentAdapter.getInitialState();

export const storyComponentReducer = createReducer<StoryComponentState>(
  initialStoryComponentState,
  on(StoryComponentActions.createStoryComponent, (state, { component }) => {
    return storyComponentAdapter.upsertOne(component, state);
  }),
  on(StoryComponentActions.updateStoryComponent, (state, { component }) => {
    return storyComponentAdapter.upsertOne(component, state);
  }),
  on(StoryComponentActions.deleteStoryComponent, (state, { componentID }) => {
    return storyComponentAdapter.removeOne(componentID, state);
  }),
);

export const storyComponentAdapterSelectors = storyComponentAdapter.getSelectors();


