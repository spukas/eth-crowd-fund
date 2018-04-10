import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/campaign';
import { Router } from '../../routes';
class ContributeForm extends Component {
    state = {
        amount: '',
        errorMessage: '',
        loading: false,
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const { campaignAddress } = this.props;
        const campaign = Campaign(campaignAddress);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.amount, 'ether'),
            });
            
            // Refresh page to load new - changed data
            Router.replaceRoute(`/campaigns/${campaignAddress}`);
        } catch (error) {
            
        }
        this.setState({ amount: '' });
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    render() {
        const { amount, errorMessage, loading } = this.state;

        return (
            <Form onSubmit={this.handleSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label htmlFor="minContribution">Amount to contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        name="amount"
                        value={amount}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Message error header="Error encountered" content={errorMessage} />
                <Button content="Submit" primary loading={loading} />
            </Form>
        );
    }
}

export default ContributeForm;
