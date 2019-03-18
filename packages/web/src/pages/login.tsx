import { AppContext } from 'next-with-apollo';
import Router from 'next/router';
import { View } from 'react-native';
import { LoginForm } from 'src/components/LoginForm';
import { MeQuery } from 'src/graphql/types';
import { meQuery } from 'src/graphql/user/queries/me';
import { popupWindow } from 'src/utils/popupWindow';
import { Button } from './Button';

const Login = () => (
  <View>
    <LoginForm />
    <Button
      title="Facebook"
      onPress={() => popupWindow('http://localhost:4000/auth/facebook')}
    />
    <Button
      title="Google"
      onPress={() => popupWindow('http://localhost:4000/auth/google')}
    />
  </View>
);

Login.getInitialProps = async ({ apolloClient, res }: AppContext) => {
  const response = await apolloClient.query<MeQuery>({ query: meQuery });
  if (!response.data.me) return {};

  if (res) {
    res.writeHead(302, { Location: '/' });
    res.end();
  } else {
    Router.push('/');
  }

  return {};
};

export default Login;
