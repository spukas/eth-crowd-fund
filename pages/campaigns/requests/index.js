import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';

export default class RequestsIndex extends Component {
    static async getInitialProps({ query: { address } }) {
        
        return { address }
    }

    render() {
        return (
            <Layout>
                <h3>Requests List</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary content="Add Rrequest" />
                    </a>
                </Link>
            </Layout>
        );
    }
}
