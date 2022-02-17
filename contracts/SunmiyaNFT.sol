//SPDX-License-Identifier: Unlicense
pragma solidity ^0.5.0;

import './klaytn/token/KIP17/KIP17Token.sol';

contract SunmiyaNFT is KIP17Token {
    constructor (string memory name, string memory symbol) public KIP17Token(name, symbol) {
    }
}
