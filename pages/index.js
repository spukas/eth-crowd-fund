import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';

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
      description: 'Nice campaign',
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  handleClick = () => console.log('click');

  render() {
    return (
      <Layout>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
        Campaign list:
        <h3>Open Campaigns</h3>
        <Button
          content="Create Campaign"
          icon="add circle"
          labelPosition="right"
          primary
          floated="right"
          onClick={this.handleClick}
        />
        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
