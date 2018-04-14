import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link } from '../../../routes';
import { Router } from '../../../routes';

export default class NewRequest extends Component {
    static async getInitialProps({ query: { address } }) {
        return { address };
    }

    state = {
        description: '',
        value: '',
        recipient: '',
        errorMessage: '',
        loading: false,
    };

    handleInputChange = (event, { name, value }) => this.setState({ [name]: value });

    handleFormSubmit = async event => {
        event.preventDefault();
        const { description, value, recipient } = this.state;
        const { address } = this.props;
        const campaign = await Campaign(address);

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({
                from: accounts[0],
            });

            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ loading: false });
    };

    render() {
        const { description, value, recipient, errorMessage, loading } = this.state;

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
                        <label>value</label>
                        <Input name="value" value={value} onChange={this.handleInputChange} />
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
