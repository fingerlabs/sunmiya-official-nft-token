const fs = require('fs-extra');
const path = require('path');

module.exports = async function (deployer) {
  const SunmiyaNFT = artifacts.require('SunmiyaNFT');
  await deployer.deploy(SunmiyaNFT, 'Toshi NFT', 'TOSHI');
  // await deployer.deploy(SunmiyaNFT, 'Sunmiya', 'MIYA');

  const networkName = process.env.NETWORK_NAME || 'MAINNET';
  const deployPath = path.resolve(__dirname, '../output/', networkName);
  const filename = `${SunmiyaNFT.contractName}.json`;
  
  fs.mkdirpSync(deployPath);
  fs.writeFileSync(path.resolve(deployPath, filename), JSON.stringify({
    address: SunmiyaNFT.address,
    abi: SunmiyaNFT.abi
  }, null ,2), 'utf8');
};
