import { AppContext } from 'next-with-apollo';
import { Component } from 'react';
import { MeQuery } from 'src/graphql/types';
import { meQuery } from 'src/graphql/user/queries/me';
import { redirect } from './redirect';

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return class extends Component<P> {
    static async getInitialProps({ res, apolloClient }: AppContext) {
      const response = await apolloClient.query<MeQuery>({ query: meQuery });
      if (response.data.me) {
        return { me: response.data.me };
      }

      redirect('/login', res);
      return {};
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
