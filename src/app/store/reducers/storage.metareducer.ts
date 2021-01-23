import {Action, ActionReducer} from '@ngrx/store';
import {ApplicationState} from './index';
// @ts-ignore
import deepmerge from 'deepmerge';
import { pick } from 'lodash';
import {StoryComponentActions} from '../actions';

export const stateKeys = [
  'storyItemComponents',
];

export const localStorageKey = 'story-tasks';

export const saveTriggers = new Set([
  StoryComponentActions.updateStoryComponent.type,
  StoryComponentActions.deleteStoryComponent.type,
]);


export function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<ApplicationState, A>) {
  let onInit = true;

  return (state: ApplicationState, action: any) => {
    const nextState = reducer(state, action);
    const userID = nextState?.auth?.user?.id;

    if (userID) {
      if (onInit) {
        onInit = false;
        console.log('Loading component state from local storage');
        const savedState = getSavedState(composeKeys(localStorageKey, userID));
        return savedState ? deepmerge(nextState, savedState) : nextState;
      }

      if (saveTriggers.has(action.type)) {
        console.log('Saving component state changes to local storage');
        const stateToSave = pick(nextState, stateKeys);
        setSavedState(stateToSave, composeKeys(localStorageKey, userID));
      }
    }

    return nextState;
  };
}

export function setSavedState(state: any, key: string) {
  localStorage.setItem(key, JSON.stringify(state));
}

export function getSavedState(key: string): any {
  return JSON.parse(localStorage.getItem(key));
}


// TODO: Move to Util, and reuse on story-component
const composeKeys = (A: string, B: string): string => `${A}:${B}`;
