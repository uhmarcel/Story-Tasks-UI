import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {StoryActions} from '../store/actions';
import {NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter, map, shareReplay, tap} from 'rxjs/operators';
import {routeTitles} from '../app-routing.module';
import {MenuAction, MenuItem} from '../models';
import {BACKLOG_PAGE_MENU_ITEM} from '../pages/backlog/backlog.component';
import {BOARD_PAGE_MENU_ITEM} from '../pages/board/board.component';

@Injectable({
  providedIn: 'root'
})
export class NavigationMenuService {

  public menuItems: MenuItem[];
  public menuTitle$: Observable<string>;
  public menuActions$: Observable<MenuAction[]>;
  public isSideMenuOpen$: Observable<boolean>;
  public shouldDisplayMenu$: Observable<boolean>;

  private _menuTitle$: BehaviorSubject<string>;
  private _menuActions$: BehaviorSubject<MenuAction[]>;
  private _isSideMenuOpen$: BehaviorSubject<boolean>;

  // Shared actions
  public readonly ADD_STORY_ACTION: MenuAction = {
    icon: 'add',
    action: () => this.store.dispatch(StoryActions.openStoryEditor({}))
  };

  constructor(
    private readonly store: Store,
    private readonly router: Router
  ) {
    this.menuItems = [
      BACKLOG_PAGE_MENU_ITEM,
      BOARD_PAGE_MENU_ITEM
    ];

    this._menuTitle$ = new BehaviorSubject<string>(this.menuItems[0].title);
    this._menuActions$ = new BehaviorSubject<MenuAction[]>([this.ADD_STORY_ACTION]);
    this._isSideMenuOpen$ = new BehaviorSubject<boolean>(false);

    this.menuTitle$ = this._menuTitle$.asObservable();
    this.menuActions$ = this._menuActions$.asObservable();

    this.shouldDisplayMenu$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects !== '/login'),
      distinctUntilChanged(),
      shareReplay(1)
    );

    this.isSideMenuOpen$ = combineLatest([this._isSideMenuOpen$, this.shouldDisplayMenu$]).pipe(
      map(([toggle, display]) => !!toggle && !!display)
    );

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => routeTitles[event.urlAfterRedirects]
      ? this.setMenuTitle(routeTitles[event.urlAfterRedirects])
      : null
    );
  }

  setActiveMenu(menu: MenuItem) {
    this.setMenuTitle(menu.title);
  }

  setMenuTitle(title: string) {
    this._menuTitle$.next(title);
  }

  setMenuActions(actions: MenuAction[]) {
    this._menuActions$.next(actions);
  }

  toggleSideMenu(toggle: boolean) {
    this._isSideMenuOpen$.next(toggle);
  }

}
