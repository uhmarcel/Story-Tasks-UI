import { environment } from '../../environments/environment';

export const oicdConfig = {
  baseHref: 'https://dev-963451.okta.com',
  issuer: 'https://dev-963451.okta.com/oauth2/default',
  redirectUri: window.location.origin + environment.baseHref + 'auth-callback',
  clientId: '0oa10gezjnESlhgpe4x7',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  testing: {
    disableHttpsCheck: !environment.production,
  }
};
