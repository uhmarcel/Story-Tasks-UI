import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';

@Injectable()
export class StoryComponentEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
  ) {}

}
