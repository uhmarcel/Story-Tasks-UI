import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {distinctUntilChanged, map, shareReplay} from 'rxjs/operators';
import {CONSTANTS} from '../config/constants.config';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  public readonly isMobileView$: Observable<boolean>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.isMobileView$ = this.breakpointObserver
      .observe([`(min-width: ${CONSTANTS.MOBILE_VIEW_BREAKPOINT}px)`])
      .pipe(
        map((state: BreakpointState) => !state.matches),
        distinctUntilChanged(),
        shareReplay(1)
      );
  }
}
