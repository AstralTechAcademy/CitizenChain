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
            // institution ID signers address  
  mapping(string => address[]) signers_;

  constructor() public {
    owner_ = msg.sender;
  }

  function isSigner(address signer, string memory institutionID) external view returns (bool)
  {
    address[] memory signers = signers_[institutionID];

    for(uint256 index = 0; index < signers.length; index++)
    {
      if(signers[index] == signer)
        return true;
    }

    return false;
  }

  function addInstitution(string memory id, string memory name) external {
    institutions_[id] = Institution(id, name);
    signers_[id].push(owner_);
    add(id);
  }

  function getInstitution(string memory id) external view returns (Institution memory) {
    return institutions_[id];
  }

  function getInstitutions() external view returns (string[] memory) {
    return ids_;
  }
}
