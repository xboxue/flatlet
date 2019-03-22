import { objectToParams } from '@flatlet/common';

export const getFacebookUrl = () => {
  const facebookParams = {
    client_id: '396342057862074',
    redirect_uri: 'http://localhost:3000/oauth-callback',
    response_type: 'code',
    scope: 'email',
    display: 'popup',
    state: 'provider=facebook'
  };

  const facebookUrl = `https://www.facebook.com/v3.2/dialog/oauth?`;

  return facebookUrl + objectToParams(facebookParams);
};

export const getGoogleUrl = () => {
  const googleParams = {
    client_id:
      '274846110399-8sgac0nv65j86018iscmd97p34mmdgs3.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:3000/oauth-callback',
    response_type: 'code',
    scope: 'openid profile email',
    state: 'provider=google'
  };

  const googleUrl = 'https://accounts.google.com/o/oauth2/v2/auth?';

  return googleUrl + objectToParams(googleParams);
};
