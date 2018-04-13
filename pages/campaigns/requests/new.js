import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
// import { Link } from '../../../routes';

export default class NewRequest extends Component {
    render() {
        return (
            <Layout>
                <h3>New Request</h3>

                <Button primary content="Submit Request" />
            </Layout>
        );
    }
}
