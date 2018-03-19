import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
  async componentDidMount() {
    const campaignList = await factory.methods.getDeployedCampaigns().call();

    console.log({ campaignList });
  }

  render() {
    return <div>Campaign list:</div>;
  }
}

export default CampaignIndex;
