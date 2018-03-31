import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minContribution: '',
    errorMessage: '',
    loading: false,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async event => {
    event.preventDefault();
    const { minContribution } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    // catch error
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minContribution)
        .send({ from: accounts[0] });

      // after new campaign is created, redirect user to main page
      Router.pushRoute('/');
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render() {
    const { minContribution, errorMessage, loading } = this.state;

    return (
      <Layout>
        <h3>Create new Campaign</h3>
        <Form onSubmit={this.handleSubmit} error={!!errorMessage}>
          <Form.Field>
            <label htmlFor="minContribution">Minimum contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              name="minContribution"
              value={minContribution}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Message error header="Error encountered" content={errorMessage} />
          <Button content="Create" primary loading={loading} />
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
