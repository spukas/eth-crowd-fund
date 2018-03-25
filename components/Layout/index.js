import React from 'react';
import Head from 'next/head';
import Header from '../Header';
import { Container } from 'semantic-ui-react';

const Layout = ({ children }) => (
  <Container>
    {/* Populate html head element */}
    <Head>
      <title>Hello</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
      />
    </Head>

    <Header />
    {children}
  </Container>
);

export default Layout;
