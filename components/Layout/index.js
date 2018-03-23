import React from 'react';
import Header from '../Header';

const Layout = ({ children }) => (
  <div className="layout--space">
    <Header />
    {children}
    <h1>Footer</h1>

    {/*
      Styles goes here
    */}
    <style jsx>{`
      .layout--space {
        margin: 20px 40px;
      }
    `}</style>
  </div>
);

export default Layout;
