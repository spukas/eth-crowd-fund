import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class Header extends Component {
  state = { activeItem: 'crowdCoin' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const isActive = name => activeItem === name;

    return (
      <Menu style={{ marginTop: '20px' }}>
        <Menu.Item
          name="crowdCoin"
          active={isActive('crowdCoin')}
          onClick={this.handleItemClick}
        >
          CrowdCoin
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="campaigns"
            active={isActive('campaigns')}
            onClick={this.handleItemClick}
          >
            Campaigns
          </Menu.Item>

          <Menu.Item
            name="add"
            active={isActive('add')}
            onClick={this.handleItemClick}
          >
            +
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
