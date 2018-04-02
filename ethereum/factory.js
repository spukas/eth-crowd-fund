import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x70379E1C228Cc42F887CfFE0a29eC08D35b4E07D',
);

export default instance;
