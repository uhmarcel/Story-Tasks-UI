import { Component } from '@angular/core';
import {ApiService} from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'story-tasks-ui';

  constructor(
    private readonly apiService: ApiService
  ) {
    this.apiService.getStoryItems().subscribe(console.log);
  }
}
