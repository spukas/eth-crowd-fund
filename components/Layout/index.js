import React from 'react';
import Header from '../Header';
import { Container } from 'semantic-ui-react';

const Layout = ({ children }) => (
  <Container>
    <Header />
    {children}
    <h1>Footer</h1>
  </Container>
);

export default Layout;
