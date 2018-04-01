import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  // this is specific next.js method to load data on the server
  // Next.js ignores componendDidMount() on the server
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    // return an object that will be passed as props to the component
    return { campaigns };
  }

  renderCampaigns = () => {
    const items = this.props.campaigns.map(campaign => ({
      header: campaign,
      description: (
        <Link route={`campaigns/${campaign}`}>
          <a>View campaign</a>
        </Link>
      ),
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  render() {
    return (
      <Layout pageName="CrowdCoin - Campaigns">
        <h3>Open Campaigns</h3>

        <Link route="campaigns/new">
          <a>
            <Button
              content="Create Campaign"
              icon="add circle"
              labelPosition="right"
              floated="right"
              primary
            />
          </a>
        </Link>
        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
