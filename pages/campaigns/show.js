import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import factory from '../../ethereum/factory';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';
import GoBack from '../../components/GoBack';

class CampaignShow extends Component {
    static propTypes = {};

    // this is specific next.js method to load data on the server
    // Next.js ignores componendDidMount() on the server
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        // return an object that will be passed as props to the component
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
        };
    }

    renderCards = () => {
        const { minimumContribution, balance, requestsCount, approversCount, manager } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'By creating request, manager can withdraw money',
                style: { overflowWrap: 'break-word' },
            },
            {
                header: minimumContribution,
                meta: 'Minimum contribution (wei)',
                description: 'You must contribute at least this much to become an approver',
            },
            {
                header: requestsCount,
                meta: 'Number of requests',
                description:
                    'A request tries to withdraw money from the contract. Requests must be approved by approvers',
            },
            {
                header: approversCount,
                meta: 'Number of approvers',
                description: 'Number of people who donated to this campaign',
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign balance (ether)',
                description: 'Balance of how much money this campaign left to spend',
            },
        ];
        return <Card.Group items={items} />;
    };

    render() {
        const { address } = this.props;
        return (
            <Layout pageName="CrowdCoin - Campaign">
                <GoBack route="/" />
                <h3>Campaign info</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm campaignAddress={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${address}/requests`}>
                                <a>
                                    <Button primary content="Requests" />
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;
