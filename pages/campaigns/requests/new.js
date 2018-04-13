import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link } from '../../../routes';

export default class NewRequest extends Component {
    static async getInitialProps({ query: { address } }) {
        const campaign = await Campaign(address);
        

        return { address };
    }

    state = {
        description: '',
        amount: '',
        recipient: '',
        errorMessage: '',
        loading: false,
    };

    handleInputChange = (event, { name, value }) => this.setState({ [name]: value });

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const { description, amount, recipient } = this.state;


    };

    render() {
        const { description, amount, recipient, errorMessage, loading } = this.state;
        
        return (
            <Layout>
                <h3>New Request</h3>
                <Form onSubmit={this.handleFormSubmit} error={!!errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            name="description"
                            value={description}
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Amount</label>
                        <Input name="amount" value={amount} onChange={this.handleInputChange} />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            name="recipient"
                            value={recipient}
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>
                    <Message error header="Error encountered" content={errorMessage} />
                    <Button primary content="Submit Request" loading={loading} />
                </Form>
            </Layout>
        );
    }
}
