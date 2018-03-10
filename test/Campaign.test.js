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
    .deploy({ data: compildeFactory.bytecode })
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
