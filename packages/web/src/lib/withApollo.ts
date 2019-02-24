import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import withApollo from 'next-with-apollo';

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
      cache: new InMemoryCache().restore(initialState || {})
    })
);
