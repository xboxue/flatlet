import Document, {
  Head,
  Main,
  NextDocumentContext,
  NextScript
} from 'next/document';
import React from 'react';
import { AppRegistry } from 'react-native';
import { ServerStyleSheet } from 'styled-components';

interface Props {
  styleTags: Array<React.ReactElement<{}>>;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps({ renderPage }: NextDocumentContext) {
    AppRegistry.registerComponent('Main', () => Main);

    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
