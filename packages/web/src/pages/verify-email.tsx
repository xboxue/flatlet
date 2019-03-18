import { AppContext } from 'next-with-apollo';
import Router from 'next/router';
import { VerifyEmailMutation, VerifyEmailVariables } from 'src/graphql/types';
import { verifyEmailMutation } from 'src/graphql/user/mutations/verifyEmail';

const VerifyEmail = () => null;

VerifyEmail.getInitialProps = async ({
  query: { token },
  res,
  apolloClient
}: AppContext) => {
  if (!token) return {};

  try {
    await apolloClient.mutate<VerifyEmailMutation, VerifyEmailVariables>({
      mutation: verifyEmailMutation,
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

export default VerifyEmail;
