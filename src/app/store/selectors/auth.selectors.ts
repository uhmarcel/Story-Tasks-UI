import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (authState) => authState.user
);

export const selectUserGivenName = createSelector(
  selectUser,
  (user) => user?.name
);
