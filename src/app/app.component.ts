import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Store} from '@ngrx/store';
import {StoryState} from './store/reducers/story.reducer';
import {loadStoryItems} from './store/actions/story.actions';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Story Tasks UI';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private store: Store<StoryState>
  ){
    this.loadPriorityIcons();
    // this.store.dispatch(loadStoryItems());
    // console.log('dispatched');
    // this.store.pipe(tap(console.log)).subscribe();
  }

  loadPriorityIcons() {
    const sanitize = (url: string) => this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    this.matIconRegistry.addSvgIcon('BLOCKER', sanitize('./assets/priority/blocker.svg'));
    this.matIconRegistry.addSvgIcon('CRITICAL', sanitize('./assets/priority/critical.svg'));
    this.matIconRegistry.addSvgIcon('VERY_HIGH', sanitize('./assets/priority/very_high.svg'));
    this.matIconRegistry.addSvgIcon('HIGH', sanitize('./assets/priority/high.svg'));
    this.matIconRegistry.addSvgIcon('MEDIUM', sanitize('./assets/priority/medium.svg'));
    this.matIconRegistry.addSvgIcon('LOW', sanitize('./assets/priority/low.svg'));
    this.matIconRegistry.addSvgIcon('VERY_LOW', sanitize('./assets/priority/very_low.svg'));
    this.matIconRegistry.addSvgIcon('OPTIONAL', sanitize('./assets/priority/optional.svg'));
  }
}

