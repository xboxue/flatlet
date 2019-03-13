import ApolloClient from 'apollo-client';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo-hooks';
import withApollo from 'src/lib/withApollo';

interface Props {
  apollo: ApolloClient<any>;
}

class MyApp extends App<Props> {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
