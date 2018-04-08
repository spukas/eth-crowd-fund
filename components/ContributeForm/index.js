import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
// import factory from '../../ethereum/factory';
// import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/campaign';

class ContributeForm extends Component {
    state = {
        amount: '',
        errorMessage: '',
        loading: false,
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
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
