const process = require('process');
const getProxyAddress = require('./shared').getProxyAddress;

async function run(network, name, index, functionName) {
  const proxyAddress = getProxyAddress(network, name, index)
  const contractClass = artifacts.require(name)
  const instance = await contractClass.at(proxyAddress)
  const said = await instance[functionName]()
  console.log(said)
}

module.exports = function(cb) {
  const scriptIndex = process.argv.indexOf('scripts/run.js');
  const networkIndex = process.argv.indexOf('--network');
  const networkName = process.argv[networkIndex+1];

  const contractName = process.argv[scriptIndex+1];
  const proxyIndex = process.argv[scriptIndex+2];
  const functionName = process.argv[scriptIndex+3];
  run(networkName, contractName, proxyIndex, functionName).then(cb).catch(cb);
}