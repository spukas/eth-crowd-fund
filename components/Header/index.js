import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../../routes';

class Header extends Component {
  render() {
    const { pageName } = this.props;
    const isActive = name => pageName === name;

    return (
      <Menu style={{ marginTop: '20px' }} pointing>
        <Link route="/">
          <Menu.Item>CrowdCoin</Menu.Item>
        </Link>

        <Menu.Menu position="right">
          <Link route="/">
            <Menu.Item active={isActive('CrowdCoin - Campaigns')}>
              Campaigns
            </Menu.Item>
          </Link>

          <Link route="campaigns/new">
            <Menu.Item active={isActive('CrowdCoin - Create new campaign')}>
              +
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
