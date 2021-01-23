import { NG_ENV } from 'angular-server-side-configuration/ng-env';

export const environment = {
  production: false,
  backendUrl: NG_ENV.BACKEND_URL || 'http://localhost:8080',
  baseHref: NG_ENV.BASE_HREF || '/'
};
