// Story Component State

import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {StoryItem, StoryItemUI} from '../../models/types';
import {createReducer, on} from '@ngrx/store';
import {StoryComponentActions} from '../actions';
import {storyAdapter} from './story.reducer';

export interface StoryComponentState extends EntityState<StoryItemUI> {}

export const combineIDs = (containerID: string, storyID: number) => `${containerID}:${storyID}`;
export const selectComponentID = (component: StoryItemUI) => combineIDs(component.containerID, component.storyID);

export const storyComponentAdapter: EntityAdapter<StoryItemUI> = createEntityAdapter<StoryItemUI>({
  selectId: selectComponentID
});

export const initialStoryComponentState = storyComponentAdapter.getInitialState();

export const storyComponentReducer = createReducer<StoryComponentState>(
  initialStoryComponentState,
  on(StoryComponentActions.createStoryComponent, (state, { component }) => {
    localStorage.setItem(selectComponentID(component), JSON.stringify(component));
    return storyComponentAdapter.upsertOne(component, state);
  }),
  on(StoryComponentActions.updateStoryComponent, (state, { component }) => {
    localStorage.setItem(selectComponentID(component), JSON.stringify(component));
    return storyComponentAdapter.upsertOne(component, state);
  }),
  on(StoryComponentActions.deleteStoryComponent, (state, { componentID }) => {
    localStorage.removeItem(componentID);
    return storyComponentAdapter.removeOne(componentID, state);
  }),
  on(StoryComponentActions.toggleIsExpanded, (state, { componentID, isExpanded }) => {
    const updated = { ...state.entities[componentID], isExpanded };
    localStorage.setItem(componentID, JSON.stringify(updated));
    return storyComponentAdapter.upsertOne(updated, state);
  })
);

export const storyComponentAdapterSelectors = storyComponentAdapter.getSelectors();


