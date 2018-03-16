const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const testNetwork = {
  old: 'https://rinkeby.infura.io/HfQdjgWWudJBNx0VUPe2',
  new: 'https://rinkeby.infura.io/wJiQov8QOQ7Bckg64AHV',
};

const provider = new HDWalletProvider(
  'version fold actor render decrease good figure merry render hundred dose indoor',
  testNetwork.new,
);

const { interface, bytecode } = compiledFactory;

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Atempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('contract deployed to', result.options.address);
};

deploy();
