import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import withApollo from 'next-with-apollo';

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      link: createHttpLink({
        uri: 'http://localhost:4000/graphql',
        credentials: 'include'
      }),
      cache: new InMemoryCache().restore(initialState || {})
    })
);
