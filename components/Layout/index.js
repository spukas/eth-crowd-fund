import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Header from '../Header';
import { Container } from 'semantic-ui-react';

const Layout = ({ children, pageName }) => (
  <Container>
    {/* Populate html head element */}
    <Head>
      <title>{pageName}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
      />
    </Head>

    <Header pageName={pageName} />
    {children}
  </Container>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageName: PropTypes.string,
};

Layout.defaultProps = {
  pageName: 'CrowdCoin',
};

export default Layout;
