import { AppContext } from 'next-with-apollo';
import Router from 'next/router';
import { Component, ComponentType } from 'react';
import { MeQuery } from 'src/graphql/types';
import { meQuery } from 'src/graphql/user/queries/me';

export function withAuth<P>(WrappedComponent: ComponentType<P>) {
  return class extends Component<P> {
    static async getInitialProps({ res, apolloClient }: AppContext) {
      const response = await apolloClient.query<MeQuery>({ query: meQuery });
      if (response.data.me) {
        return { me: response.data.me };
      }

      if (res) {
        res.writeHead(302, { Location: '/login' });
        res.end();
      } else {
        Router.push('/login');
      }
      return {};
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
