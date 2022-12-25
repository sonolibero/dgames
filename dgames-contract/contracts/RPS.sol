// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RPS {
    uint256 public balance;

    function newGame() public payable {
        require(msg.value >= 0, "more than zero ether pls");
        balance += msg.value;
    }
}
