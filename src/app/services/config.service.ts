import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable()
export class ConfigService {
  private config;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.config = data;
      });
  }

  getConfig(key: string): string {
    console.log(this.config)
    return this.config && this.config[key]
      ? this.config[key]
      : environment[key];
  }
}
