import {EntityState} from '@ngrx/entity';
import {StoryItem, User} from '../../models';
import {createReducer, on} from '@ngrx/store';
import {AuthActions} from '../actions';

export interface AuthState {
  user: User;
}

export const initialAuthState = {
  user: null,
};

export const authReducer = createReducer<AuthState>(
  initialAuthState,
  on(AuthActions.hydrateUserSuccess, (state, user) => {
    const nextState = {
      ...state,
      user
    };
    return nextState;
  }),
);





