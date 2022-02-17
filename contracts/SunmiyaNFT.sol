//SPDX-License-Identifier: Unlicense
pragma solidity ^0.5.0;

import '@klaytn/contracts/utils/Address.sol';
import '@klaytn/contracts/drafts/Counters.sol';
import '@klaytn/contracts/math/SafeMath.sol';
import '@klaytn/contracts/token/KIP17/IERC721Receiver.sol';
import '@klaytn/contracts/token/KIP17/KIP17Token.sol';

contract SunmiyaNFT is KIP17Token {
    string private greeting;

    constructor (string memory name, string memory symbol) public KIP17Token(name, symbol) {
      
    }
}
