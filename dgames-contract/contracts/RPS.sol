// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RPS {
    // The contract's balance in wei
    uint256 public balance;

    // The minimum amount of wei required to start a new game
    uint256 public minBet;

    constructor() public {
        // Set the minimum bet to 0.01 ETH
        minBet = 100000000000000000;
    }

    function newGame() public payable {
        // Make sure the user has sent enough wei
        require(msg.value >= minBet, "Insufficient bet");

        // Update the contract's balance
        balance += msg.value;
    }
}
