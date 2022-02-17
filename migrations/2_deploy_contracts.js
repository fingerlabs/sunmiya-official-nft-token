module.exports = async function (deployer) {
  const SunmiyaNFT = artifacts.require('SunmiyaNFT');
  await deployer.deploy(SunmiyaNFT, 'Sunmiya', 'MIYA');
};
