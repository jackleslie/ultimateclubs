import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="UK Ultimate Team Directory" />
          <meta name="author" content="Jack Leslie" />
          <meta property="og:image" content="/favicon.ico" />
          <meta
            property="og:description"
            content="Directory of Ultimate Clubs in the UK"
          />
          <meta property="og:title" content="UK Ultimate Team Directory" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
