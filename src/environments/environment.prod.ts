import { NG_ENV } from 'angular-server-side-configuration/ng-env';

export const environment = {
  production: true,
  backendUrl: NG_ENV.BACKEND_URL || 'https://story-tasks-api.herokuapp.com',
  baseHref: NG_ENV.BASE_HREF || '/'
};
