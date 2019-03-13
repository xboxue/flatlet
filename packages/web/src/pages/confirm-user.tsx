import { AppContext } from 'next-with-apollo';
import Router from 'next/router';
import { ConfirmUserMutation, ConfirmUserVariables } from 'src/graphql/types';
import { confirmUserMutation } from 'src/graphql/user/mutations/confirmUser';

const ConfirmUser = () => null;

ConfirmUser.getInitialProps = async ({
  query: { token },
  res,
  apolloClient
}: AppContext) => {
  if (!token) return {};

  try {
    await apolloClient.mutate<ConfirmUserMutation, ConfirmUserVariables>({
      mutation: confirmUserMutation,
      variables: { token: token as string }
    });
  } catch (error) {
    throw error;
  }

  if (res) {
    res.writeHead(303, { Location: '/login' });
    res.end();
  } else {
    Router.push('/login');
  }

  return {};
};

export default ConfirmUser;
