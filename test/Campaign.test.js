const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
// create new instance using ganache provider to communicate with Rinkeby network
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  // create new campaign using factory
  await factory.methods
    .createCampaign('100')
    .send({ from: accounts[0], gas: '1000000' });

  // access newly created campaigns address
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  // create actual instance of the campaign
  // calling second argument of Contract() instructs web3 that contract exists
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress,
  );
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1],
    });

    // to access mappings we need to pass an argument and we receive true or false
    const isContributer = await campaign.methods.approvers(accounts[1]).call();

    assert(isContributer);
  });

  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        value: '5',
        from: accounts[1],
      });
    } catch (err) {
      assert(err);
      return;
    }
    assert(false);
  });

  it('allows manager to create a payment request', async () => {
    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[1])
      .send({ from: accounts[0], gas: '1000000' });

    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy batteries', request.description);
  });

  it('all contract processes', async () => {
    await campaign.methods
      .contribute()
      .send({ value: web3.utils.toWei('10', 'ether'), from: accounts[0] });

    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({ from: accounts[0], gas: '1000000' });

    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[0], gas: '1000000' });

    let startBalance = await web3.eth.getBalance(accounts[1]);
    startBalance = web3.utils.fromWei(startBalance, 'ether');
    startBalance = parseFloat(startBalance);

    await campaign.methods
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: '1000000' });

    let endBalance = await web3.eth.getBalance(accounts[1]);
    endBalance = web3.utils.fromWei(endBalance, 'ether');
    endBalance = parseFloat(endBalance);

    assert.equal('5', endBalance - startBalance);
  });
});
