import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SunmiyaNFT } from '../typechain';

describe('SunmiyaNFT', function () {
  let owner: SignerWithAddress;
  let userA: SignerWithAddress;
  let userB: SignerWithAddress;
  let userC: SignerWithAddress;

  let sunmiyaNFT: SunmiyaNFT;

  beforeEach(async function () {
    [owner, userA, userB, userC] = await ethers.getSigners();
    const SunmiyaNFT = await ethers.getContractFactory('SunmiyaNFT');
    sunmiyaNFT = await SunmiyaNFT.deploy('Sunmiya', 'MIYA');
    await sunmiyaNFT.deployed();
  });

  it('배포자가 민팅을 할 경우 성공해야 한다.', async function () {
    await sunmiyaNFT.mint(userA.address, 1);

    const balance = await sunmiyaNFT.balanceOf(userA.address);

    expect(balance).to.equal(1);
  });

  it('민팅권한이 없는 계정이 민트를 할 때 실패해야 한다.', async function () {
    const sunmiyaNFTForUserA = sunmiyaNFT.connect(userA);

    await expect(sunmiyaNFTForUserA.mint(userA.address, 1)).to.revertedWith(
      'MinterRole: caller does not have the Minter role'
    );
  });

  it('같은 tokenID 민팅은 실패해야 한다.', async function () {
    await sunmiyaNFT.mint(userA.address, 1);

    await expect(sunmiyaNFT.mint(userA.address, 1)).to.revertedWith(
      'token already minted'
    );
  });

  it('민팅권한을 다른 계정에 추가하여 민팅 할 수 있다', async function () {
    await sunmiyaNFT.addMinter(userA.address);

    // owner로 민팅
    await sunmiyaNFT.mint(userB.address, 1);
    // userA로 민팅
    await sunmiyaNFT.connect(userA).mint(userB.address, 2);

    const balance = await sunmiyaNFT.balanceOf(userB.address);
    expect(balance).to.equal(2);
  });

  it('토큰을 pause 할 경우 토큰이 전송되면 안된다.', async function () {
    await sunmiyaNFT.mint(userA.address, 1);

    // pause
    await sunmiyaNFT.pause();

    // userA -> userB 로 #1 전송 시도는 실패
    await expect(
      sunmiyaNFT.connect(userA).transferFrom(userA.address, userB.address, 1)
    ).to.revertedWith('Pausable: paused');
  });

  it('토큰을 unpause 할 경우 토큰이 전송되어야 한다..', async function () {
    await sunmiyaNFT.mint(userA.address, 1);

    // pause
    await sunmiyaNFT.pause();

    // unpause
    await sunmiyaNFT.unpause();

    expect(
      await sunmiyaNFT
        .connect(userA)
        .transferFrom(userA.address, userB.address, 1)
    ).to.not.throw;
  });
});
