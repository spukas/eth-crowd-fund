import Web3 from 'web3';

let web3;

// check is user has access to metamask object in the browser
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  // setup our own provider
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/wJiQov8QOQ7Bckg64AHV',
  );
  web3 = new Web3(provider);
}

export default web3;
