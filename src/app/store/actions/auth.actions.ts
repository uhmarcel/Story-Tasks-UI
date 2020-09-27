import {createAction, props} from '@ngrx/store';
import {StoryItemParams, User} from '../../models';

export const hydrateUser = createAction('[Auth] Hydrate user session');
export const hydrateUserSuccess = createAction('[Auth] Hydrate user session SUCCESS', props<User>());

export const signOut = createAction('[Auth] Sign out session');


