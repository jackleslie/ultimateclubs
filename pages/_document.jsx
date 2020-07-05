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
          <meta name="description" content="UK Ultimate Clubs" />
          <meta name="author" content="Jack Leslie" />
          <meta property="og:image" content="/favicon.ico" />
          <meta
            property="og:description"
            content="Find and search for Ultimate clubs in the UK"
          />
          <meta property="og:title" content="UK Ultimate Clubs" />
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
