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

  string state_;
}

contract TitleRegistry is EducationAC {

  address private owner_;  
  mapping(uint => Title) titles_;
  mapping(uint => bool) exist1_;
  mapping(address => uint[]) students_;
  mapping(address => uint[]) inst2titles_;
  uint count1_;

  constructor() public {
    owner_ = msg.sender;
  }

  modifier notExist1(uint id)
  {
    require(exist1_[id] == false, "Degree already added");
    _;
  }

  function emitTitle(uint id, address institution, address degree, address student, uint16 year) external notExist1(id) {
    titles_[id] = Title(id, institution, degree, student, year, "Active");
    students_[student].push(id);
    inst2titles_[institution].push(id);
    exist1_[id] = true;
    count1_++;
  }

  function getTitle(uint id) external view returns (Title memory) {
    return titles_[id];
  }

  function getTitlesByStudent(address id) external view returns (uint[] memory) {
    return students_[id];
  }

  function getTitlesByInstitution(address id) external view returns (uint[] memory) {
    return inst2titles_[id];
  }

  function cancelTitle(uint id) external {
    Title storage title = titles_[id];
    title.state_ = "Inactive";
  }

  function count1() external view returns (uint) {
    return count1_;
  } 

  function owner1() external view returns (address) {
    return owner_;
  }
}
