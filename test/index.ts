import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('SunmiyaNFT', function () {
  it("Should success mint", async function () {
    const [owner, userA, userB] = await ethers.getSigners();

    const SunmiyaNFT = await ethers.getContractFactory('SunmiyaNFT');
    const sunmiyaNFT = await SunmiyaNFT.deploy('Sunmiya', 'MIYA');
    await sunmiyaNFT.deployed();

    await sunmiyaNFT.mint(userA.address, 1);
    const balance = await sunmiyaNFT.balanceOf(userA.address);
    expect(balance).to.equal(1);
  });

  it("Should failure mint by not mint role", async function () {
    const [owner, userA, userB] = await ethers.getSigners();

    const SunmiyaNFT = await ethers.getContractFactory('SunmiyaNFT');
    const sunmiyaNFT = await SunmiyaNFT.deploy('Sunmiya', 'MIYA');
    await sunmiyaNFT.deployed();

    await expect(sunmiyaNFT.connect(userA).mint(userA.address, 1)).to.revertedWith('Minter role');
  });

});
