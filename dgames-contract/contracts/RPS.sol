// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RPS {

    function playGame(uint256 _choice) payable public returns (uint256) {
        uint256 computer = random();

        if (_choice == computer) {
            return 1;
        } else if (
            (_choice == 0 && computer == 1) ||
            (_choice == 1 && computer == 2) ||
            (_choice == 2 && computer == 0)
        ) {
            payable(msg.sender).transfer(msg.value * 2);
            return 2;
        } else {
            return 0;
        }
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 3;
    }
}