const HDWalletProvider = require('truffle-hdwallet-provider-klaytn');

const privateKey = process.env.PRIVATE_KEY;
module.exports = {
  networks: {
    // for ganache
    development: {
      provider: () => {
        return new HDWalletProvider(privateKey, 'http://54.180.113.55:8551');
      },
      network_id: '1001', // Any network (default: none)
      gas: 8500000,
      gasPrice: null,
    },
    baobab: {
      provider: () => {
        return new HDWalletProvider(
          privateKey,
          'https://api.baobab.klaytn.net:8651'
        );
      },
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null,
    },
    cypress: {
      provider: () => {
        return new HDWalletProvider(privateKey, 'http://your.cypress.en:8551');
      },
      network_id: '8217', //Klaytn mainnet's network id
      gas: '8500000',
      gasPrice: null,
    },
  },
  // Set default mocha options here, use special reporters etc.

  mocha: {
    // timeout: 100000
  },
  compilers: {
    solc: {
      version: '0.5.6', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true, // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
        // evmVersion: "constantinople" // "istanbul", "constantinople"
      },
    },
  },
};
