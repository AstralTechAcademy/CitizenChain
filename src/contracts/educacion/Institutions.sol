//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./EducationAC.sol";


struct Institution {
  address id; // wallet institution

  string name_;
}

contract Institutions is EducationAC {

  address private owner_;
  
  mapping(address => Institution) institutions_;

  constructor() public {
    owner_ = msg.sender;
  }

  modifier isOwner() {
    require(owner_ == msg.sender,
      "Caller is not the owners"
    );
    _;
  }

  function addInstitution(address id, string memory name) external {
    institutions_[id] = Institution(id, name);
  }

  function getInstitution(address id) external view returns (string memory) {
    return institutions_[id].name_;
  }

  function owner() external view returns (address) {
    return owner_;
  }
}
