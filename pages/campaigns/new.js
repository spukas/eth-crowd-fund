import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {
  state = {
    minContribution: '',
    submitedContribution: '',
    submittedFromAccount: '',
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async event => {
    event.preventDefault();
    const { minContribution } = this.state;

    const accounts = await web3.eth.getAccounts();
    await factory.methods
      .createCampaign(minContribution)
      .send({ from: accounts[0] });

    this.setState({
      submitedContribution: minContribution,
      submittedFromAccount: accounts[0],
      minContribution: '',
    });
  };

  render() {
    const {
      minContribution,
      submitedContribution,
      submittedFromAccount,
    } = this.state;

    return (
      <Layout>
        <h3>Create new Campaign</h3>
        <Form onSubmit={this.handleSubmit}>
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
          <Form.Button content="Create" primary />
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ minContribution }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>
          {JSON.stringify(
            { submitedContribution, submittedFromAccount },
            null,
            2,
          )}
        </pre>
      </Layout>
    );
  }
}

export default CampaignNew;