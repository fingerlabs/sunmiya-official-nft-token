const fs = require('fs-extra');
const path = require('path');
const env = require('env-var');

const NETWORK_NAME = env.get('NETWORK_NAME').required().asString();

module.exports = async function (deployer) {
  const SunmiyaNFT = artifacts.require('SunmiyaNFT');
  // await deployer.deploy(SunmiyaNFT, 'Toshi NFT', 'TOSHI');
  await deployer.deploy(SunmiyaNFT, 'Sunmiya Club Official', 'MIYA');

  const networkName = NETWORK_NAME;
  const deployPath = path.resolve(__dirname, '../../', networkName);
  const filename = `${SunmiyaNFT.contractName}.json`;
  
  fs.mkdirpSync(deployPath);
  fs.writeFileSync(path.resolve(deployPath, filename), JSON.stringify({
    address: SunmiyaNFT.address,
    abi: SunmiyaNFT.abi
  }), 'utf8');
};
