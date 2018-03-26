import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class CampaignNew extends Component {
  state = { minContribution: '', submitedContribution: '' };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { minContribution } = this.state;

    this.setState({
      submitedContribution: minContribution,
      minContribution: '',
    });
  };

  render() {
    const { minContribution, submitedContribution } = this.state;

    return (
      <Layout>
        <h3>Create new Campaign</h3>
        <Form onSubmit={this.handleSubmit}>
          <label htmlFor="minContribution">Minimum contribution</label>
          <Form.Input
            name="minContribution"
            value={minContribution}
            onChange={this.handleChange}
          />
          <Form.Button content="Create" primary />
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ minContribution }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submitedContribution }, null, 2)}</pre>
      </Layout>
    );
  }
}

export default CampaignNew;
