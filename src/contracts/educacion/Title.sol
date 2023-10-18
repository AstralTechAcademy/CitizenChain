//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./EducationAC.sol";

struct Title { // Struct
  uint id;
  address institution_;
  address degree_;

  address student_;

  uint16 year_;
}

struct Degree {
  address id;
  address institution_;

  string name_;
}

contract TitleRegistry is EducationAC {

  address private owner_;  
  mapping(uint => Title) titles_;
  mapping(address => Degree) degrees_;

  constructor() public {
    owner_ = msg.sender;
  }

  modifier isDegreeOwner(address degree)
  {
      require(msg.sender == degrees_[degree].institution_,
        "The sender is not a valid institution for this degree"
      );
      _;
  }

  function addDegree(address id, address institution, string memory name) external {
    degrees_[id] = Degree(id, institution, name);
  }

  function getDegree(address id) external view returns (string memory) {
    return degrees_[id].name_;
  }

  function emitTitle(uint id, address institution, address degree, address student, uint16 year) external isDegreeOwner(degree) {
    titles_[id] = Title(1, institution, degree, student, year);
  }

  function getTitle(uint id) external view returns (Title memory) {
    return titles_[id];
  }

  function owner1() external view returns (address) {
    return owner_;
  }
}
