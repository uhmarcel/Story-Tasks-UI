import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {CONSTANTS} from './config/constants.config';
import {Priority} from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private titleService: Title,
  ) {
    titleService.setTitle(CONSTANTS.APP_NAME);
    this.loadPriorityIcons();
  }

  loadPriorityIcons() {
    const sanitize = (url: string) => this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    Object.keys(Priority).forEach(priority =>
      this.matIconRegistry.addSvgIcon(
        priority,
        sanitize(`./assets/priority/${priority.toLowerCase()}.svg`)
      )
    );
  }
}

