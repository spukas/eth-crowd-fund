const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');

// remove build folder for new contracts in the future
fs.removeSync(buildPath);

const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

// create build folder to hold compiled contracts
fs.ensureDirSync(buildPath);

// loop through all possible contracts and compile each
Object.keys(output).forEach(contract =>
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract.slice(1)}.json`),
    output[contract],
  ),
);
