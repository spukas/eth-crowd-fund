import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import Campaign from '../../ethereum/campaign';

class CampaignShow extends Component {
  static propTypes = {};

  // this is specific next.js method to load data on the server
  // Next.js ignores componendDidMount() on the server
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    console.log('summary: ', summary);

    // return an object that will be passed as props to the component
    return { campaign };
  }

  state = {};

  render() {
    return (
      <Layout pageName="CrowdCoin - Campaign">
        <h1>CampaignShow Component</h1>
        <pre>{JSON.stringify(this.props.campaignStats, null, 2)}</pre>
      </Layout>
    );
  }
}

export default CampaignShow;
