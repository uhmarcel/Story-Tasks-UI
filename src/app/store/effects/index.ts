import {AuthEffects} from './auth.effects';
import {StoryEffects} from './story.effects';
import {StoryComponentEffects} from './story-component.effects';

export const applicationEffects = [
  AuthEffects,
  StoryEffects,
  StoryComponentEffects
];
