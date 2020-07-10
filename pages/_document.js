import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Meta */}
          <meta charSet="utf-8" />
          <meta name="description" content="Find and search for Ultimate clubs in the UK" />
          <meta name="author" content="Jack Leslie" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary" key="twcard" />
          <meta name="twitter:creator" content="@jackjdleslie" key="twhandle" />

          {/* Open Graph */}
          <meta property="og:url" content="https://ultimateclubs.co.uk/" key="ogurl" />
          <meta property="og:image" content="https://ultimateclubs.co.uk/favicon.png" key="ogimage" />
          <meta property="og:site_name" content="UK Ultimate Clubs" key="ogsitename" />
          <meta property="og:title" content="UK Ultimate Clubs" key="ogtitle" />
          <meta property="og:description" content="Find and search for Ultimate clubs in the UK" key="ogdesc" />

          {/* PWA */}
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

          {/* Icons */}
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="icon" sizes="192x192" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          <meta name="msapplication-square310x310logo" content="/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
