import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable()
export class ConfigService {
  private config;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('/assets/config.json').pipe(
      tap(data => console.log(data))
    )
      .toPromise()
      .then(data => {
        this.config = data;
      });
  }

  getConfig(key: string) {
    return this.config && this.config[key]
      ? this.config[key]
      : environment[key];
  }
}
