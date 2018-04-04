import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react'
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

    // return an object that will be passed as props to the component
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards = () => {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager,
    } = this.props;

    const items = [{
      header: manager,
      meta: 'Address of manager',
      description: 'By creating request, manager can withdraw money',
      style: { overflowWrap: 'break-word' }
    }];

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout pageName="CrowdCoin - Campaign">
        <h3>CampaignShow Component</h3>
        {this.renderCards()}
      </Layout>
    );
  }
}

export default CampaignShow;
