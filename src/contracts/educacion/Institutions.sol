//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/StorageStringBasic.sol";


struct Institution {
  string id_; // wallet institution
  string name_;
}

contract Institutions is StorageStringBasic {

  address private owner_;
  
  mapping(string => Institution) institutions_;

  constructor() public {
    owner_ = msg.sender;
  }

  function addInstitution(string memory id, string memory name) external {
    institutions_[id] = Institution(id, name);
    add(id);
  }

  function getInstitution(string memory id) external view returns (Institution memory) {
    return institutions_[id];
  }

  function getInstitutions() external view returns (string[] memory) {
    return ids_;
  }
}
