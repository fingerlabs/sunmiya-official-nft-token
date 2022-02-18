import crypto from 'crypto';
import hre from 'hardhat';
import { ethers } from 'hardhat';

function getRandomAccountAddress() {
  return `0x${crypto.randomBytes(20).toString('hex')}`;
}

export async function createMockSigners(count: number) {
  const mockSigners = new Array(count).fill(1);
  const mockAccountAddressList = mockSigners.map(getRandomAccountAddress);

  // create accounts
  await Promise.all(
    mockAccountAddressList.map(async (accountAddress) => {
      await hre.network.provider.request({
        method: 'hardhat_impersonateAccount',
        params: [accountAddress],
      });
    })
  );

  // set balanace
  await Promise.all(
    mockAccountAddressList.map(async (accountAddress) => {
      await hre.network.provider.send('hardhat_setBalance', [
        accountAddress,
        '0x1000000000000000000000',
      ]);
    })
  );

  // get signers
  return Promise.all(
    mockAccountAddressList.map(async (accountAddress) =>
      ethers.getSigner(accountAddress)
    )
  );

  // mockAccountAddressList.map(async (accountAddress) => {
  //   await hre.network.provider.request({
  //     method: 'hardhat_impersonateAccount',
  //     params: ['0x364d6D0333432C3Ac016Ca832fb8594A8cE43Ca6'],
  //   });
  // })
  // for(let i = 0; i < count; i++) {

  // }
}
