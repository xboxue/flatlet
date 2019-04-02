import Router, { withRouter } from 'next/router';
import { useEffect } from 'react';
import {
  useLoginFacebookMutation,
  useLoginGoogleMutation
} from 'src/graphql/types';
import { getStringParam } from 'src/utils/getStringParam';

export default withRouter(({ router }) => {
  const loginFacebook = useLoginFacebookMutation();
  const loginGoogle = useLoginGoogleMutation();

  const code = getStringParam('code', router);
  const state = getStringParam('state', router);
  const provider = state && new URLSearchParams(state).get('provider');

  useEffect(() => {
    if (!code || !provider || !window.opener) {
      Router.push('/login');
      return;
    }

    const login = async () => {
      switch (provider) {
        case 'facebook':
          await loginFacebook({ variables: { code } });
          break;

        case 'google':
          await loginGoogle({ variables: { code } });
          break;

        default:
          return;
      }

      window.opener.open('/login', '_self');
      window.close();
    };

    login();
  });

  return null;
});
