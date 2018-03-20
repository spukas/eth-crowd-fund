import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
  // this is specific next.js method to load data on the server
  // Next.js ignores componendDidMount() on the server
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    // return an object that will be passed as props to the component
    return { campaigns };
  }

  renderCampaigns = () =>
    this.props.campaigns.map(campaign => (
      <li key={campaign}>{`Campaign active on: ${campaign}`}</li>
    ));

  render() {
    return (
      <div>
        Campaign list:
        <ul>{this.renderCampaigns()}</ul>
      </div>
    );
  }
}

export default CampaignIndex;
