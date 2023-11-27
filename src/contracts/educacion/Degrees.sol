//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/StorageStringBasic.sol";


struct Degree {
  string id_;
  string name_;
}

contract Degrees is StorageStringBasic {

  address private owner_;
  
  mapping(string => Degree) degrees_;

  constructor() public {
    owner_ = msg.sender;
  }

  function addDegree(string memory id, string memory name) external notExist(id) {
    degrees_[id] = Degree(id, name);
    add(id);
  }

  function getDegree(string memory id) external view returns (Degree memory) {
    return degrees_[id];
  }

  function degreeExist(string memory id) external view returns (bool) {
    return exist2(id);
  }
}
