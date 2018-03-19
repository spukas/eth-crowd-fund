import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xfe35FF00E18e8b3a7268cfE67b0447f776349B73',
);

export default instance;
