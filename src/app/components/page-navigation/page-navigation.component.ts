import {Component, ViewChild} from '@angular/core';
import {NavigationMenuService} from '../../services/navigation-menu.service';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {ResponsiveService} from '../../services/responsive.service';
import {combineLatest, Observable} from 'rxjs';
import {filter, first, map, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AuthActions} from '../../store/actions';
import {CONSTANTS} from '../../config/constants.config';

@Component({
  selector: 'app-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrls: ['./page-navigation.component.scss']
})
export class PageNavigationComponent {

  public readonly appTitle = CONSTANTS.APP_NAME;
  public readonly appOwner = CONSTANTS.APP_OWNER;
  public readonly appOwnerLink = CONSTANTS.APP_OWNER_LINK;

  @ViewChild('sideNav')
  private readonly sideNav: MatSidenav;
  public readonly sideNavMode$: Observable<string>;
  public readonly shouldStartOpened$: Observable<boolean>;

  constructor(
    public readonly responsiveService: ResponsiveService,
    public readonly menuService: NavigationMenuService,
    public readonly router: Router,
    private readonly store: Store,
  ) {
    this.menuService.isSideMenuOpen$.subscribe(toggle => toggle
      ? this.sideNav?.open()
      : this.sideNav?.close()
    );

    this.sideNavMode$ = this.responsiveService.isMobileView$.pipe(
      map(isMobile => isMobile ? 'over' : 'side')
    );

    this.shouldStartOpened$ = combineLatest([responsiveService.isMobileView$, menuService.shouldDisplayMenu$]).pipe(
      map(([isMobile, shouldDisplay]) => !isMobile && shouldDisplay),
      first()
    );
  }

  navigateToLink(url: string) {
    window.open(url, '_blank');
  }

  logout() {
    this.store.dispatch(AuthActions.signOut());
  }

}
