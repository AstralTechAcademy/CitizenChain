//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/StorageStringBasic.sol";

contract InstitutionsDegrees is StorageStringBasic {

  address private owner_;
  
  // Instituccion => Grados
  mapping(string => string[]) registry_;

  constructor() public {
    owner_ = msg.sender;
  }

  function addDegree(string memory institutionID, string memory degreeID) external {
    registry_[institutionID].push(degreeID);
    add(institutionID);
  }

  function getDegreesByInstitution(string memory institutionID) external view returns (string[] memory) {
    return registry_[institutionID];
  }

  function isDegreeInInstitution(string memory degreeID, string memory institutionID) external view returns (bool) {
    require(exist2(institutionID), "The institution does not exist");
    string[] memory degrees = registry_[institutionID];

    for (uint256 index = 0; index < degrees.length; index++)
    {
      if(equals(degrees[index], degreeID))
        return true;
    }

    return false;
  }
}
