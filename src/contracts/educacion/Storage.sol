//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

contract Storage {
  uint256 number;

  function store(uint256 num) external {
    number = number + num;
  }

  function retrieve() external view returns (uint256) {
    return number;
  }
}
