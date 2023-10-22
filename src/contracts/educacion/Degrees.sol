//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./EducationAC.sol";


struct Degree {
  address id;
  string name_;
}

contract Degrees is EducationAC {

  address private owner_;
  
  mapping(address => Degree) degrees_;
  mapping(address => bool) exist_;
  uint count_;

  constructor() public {
    owner_ = msg.sender;
  }

  modifier notExist(address id)
  {
    require(exist_[id] == false, "Degree already added");
    _;
  }

  function addDegree(address id, string memory name) external notExist(id) {
    degrees_[id] = Degree(id, name);
    exist_[id] = true;
    count_++;
  }

  function getDegree(address id) external view returns (Degree memory) {
    return degrees_[id];
  }

  function count() external view returns (uint) {
    return count_;
  } 

  function owner4() external view returns (address) {
    return owner_;
  }
}
