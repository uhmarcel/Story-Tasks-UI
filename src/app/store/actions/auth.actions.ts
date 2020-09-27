import {createAction, props} from '@ngrx/store';
import {User} from '../../models';

export const hydrateUser = createAction('[Auth] Hydrate user session');
export const hydrateUserSuccess = createAction('[Auth] Hydrate user session SUCCESS', props<{ user: User }>());

export const signOut = createAction('[Auth] Sign out session');


