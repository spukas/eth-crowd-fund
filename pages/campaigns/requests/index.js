import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

export default class RequestsIndex extends Component {
    static async getInitialProps({ query: { address } }) {
        const campaign = Campaign(address);
        const { methods: { getRequestCount, requests: getRequests, approversCount } } = campaign;
        const requestsCount = await getRequestCount().call();
        const approvers = await approversCount().call();

        const requests = await Promise.all(
            [...Array(parseInt(requestsCount))].map((_, index) => getRequests(index).call()),
        );

        return { address, requests, requestsCount, approvers, campaign };
    }

    handleApprove = index => async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(index).send({
            from: accounts[0],
        });
    };

    handleFinalize = index => async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(index).send({
            from: accounts[0],
        });
    };

    renderRequests = () => {
        const { Row, Cell } = Table;
        const { approvers } = this.props;
        return this.props.requests.map(
            ({ description, value, recipient, approvalCount, complete }, index) => (
                <Row key={`${index}-${description}`}>
                    <Cell>{index}</Cell>
                    <Cell>{description}</Cell>
                    <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
                    <Cell>{recipient}</Cell>
                    <Cell>{`${approvalCount} / ${approvers}`}</Cell>
                    <Cell>
                        <Button
                            color="green"
                            basic
                            content="Approve"
                            onClick={this.handleApprove(index)}
                        />
                    </Cell>
                    <Cell>
                        <Button
                            color="red"
                            basic
                            content="Finalize"
                            onClick={this.handleFinalize(index)}
                        />
                    </Cell>
                </Row>
            ),
        );
    };
    render() {
        const { address } = this.props;
        const { Body, Header, HeaderCell, Row, Cell } = Table;

        return (
            <Layout>
                <Link route={`/campaigns/${address}`}>
                    <a>Go back</a>
                </Link>
                <h3>Requests List</h3>

                <Table celled>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>

                    <Body>{this.renderRequests()}</Body>
                </Table>

                <Link route={`/campaigns/${address}/requests/new`}>
                    <a>
                        <Button primary content="Add Rrequest" />
                    </a>
                </Link>
            </Layout>
        );
    }
}
