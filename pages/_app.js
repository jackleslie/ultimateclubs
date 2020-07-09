import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
