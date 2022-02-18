import { expect } from 'chai';
import { ethers } from 'hardhat';
import { createMockSigners } from '../scripts/utils';

describe('Utils', function () {
  it('Test createMockSigners', async function () {

    const mockSignerList = await createMockSigners(1000);
    const tester = mockSignerList[99]

    const SunmiyaNFT = await ethers.getContractFactory('SunmiyaNFT');
    const sunmiyaNFT = await SunmiyaNFT.connect(tester).deploy(
      'Sunmiya',
      'MIYA'
    );
    await sunmiyaNFT.deployed();

    const [owner, userA, userB] = await ethers.getSigners();
    await sunmiyaNFT.mint(userA.address, 1);
    const balance = await sunmiyaNFT.balanceOf(userA.address);
    expect(balance).to.equal(1);
  });
});
