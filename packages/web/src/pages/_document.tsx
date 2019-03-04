import Document, {
  Head,
  Main,
  NextDocumentContext,
  NextScript
} from 'next/document';
import React from 'react';
import { AppRegistry } from 'react-native-web';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }: NextDocumentContext) {
    AppRegistry.registerComponent('Main', () => Main);
    const { getStyleElement } = AppRegistry.getApplication('Main');
    const page = renderPage();
    const styles = [getStyleElement()];

    return { ...page, styles: React.Children.toArray(styles) };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
