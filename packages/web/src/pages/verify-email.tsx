import { AppContext } from 'next-with-apollo';
import { VerifyEmailMutation, VerifyEmailVariables } from 'src/graphql/types';
import { verifyEmailMutation } from 'src/graphql/user/mutations/verifyEmail';
import { redirect } from 'src/utils/redirect';

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

  redirect('/login', res);
  return {};
};

export default VerifyEmail;
