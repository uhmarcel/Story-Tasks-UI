import {Injectable} from '@angular/core';
import {HammerGestureConfig} from '@angular/platform-browser';
import { DIRECTION_ALL } from 'hammerjs';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: DIRECTION_ALL }
  } as any;
}
