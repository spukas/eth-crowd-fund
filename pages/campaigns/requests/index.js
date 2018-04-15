import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';

export default class RequestsIndex extends Component {
    static async getInitialProps({ query: { address } }) {
        const campaign = Campaign(address);
        const { methods: { getRequestCount, requests: getRequests } } = campaign;
        const requestsCount = await getRequestCount().call();

        const requests = await Promise.all(
            [...Array(parseInt(requestsCount))]
                .map((_, index) => getRequests(index).call()),
        );

        return { address, requests, requestsCount };
    }

    render() {
        const { address } = this.props;

        return (
            <Layout>
                <Link route={`/campaigns/${address}`}>
                    <a>Go back</a>
                </Link>
                <h3>Requests List</h3>
                <Link route={`/campaigns/${address}/requests/new`}>
                    <a>
                        <Button primary content="Add Rrequest" />
                    </a>
                </Link>
            </Layout>
        );
    }
}
