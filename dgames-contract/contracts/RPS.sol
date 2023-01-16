// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RPS {
    address payable creatorAddress;

    constructor() payable {
        creatorAddress = payable(msg.sender);
    }

    event GameResult(uint256 computer, string message);

    function playGame(uint256 _choice) payable public {
        uint256 computer = random();

        if (_choice == computer) {
            payable(msg.sender).transfer(msg.value); // EDU-150 to deploy
            emit GameResult(computer, 'draw');
        } else if (
            (_choice == 0 && computer == 2) ||
            (_choice == 1 && computer == 0) ||
            (_choice == 2 && computer == 1)
        ) {
            payable(msg.sender).transfer(msg.value * 2);
            emit GameResult(computer, 'player win');
        } else {
            payable(creatorAddress).transfer(msg.value); // EDU-155 to deploy
            emit GameResult(computer, 'player lose');
        }
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 3;
    }
}