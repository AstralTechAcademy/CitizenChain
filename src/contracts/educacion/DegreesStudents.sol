//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/StorageStringBasic.sol";

contract DegreesStudents is StorageStringBasic {

  address private owner_;
  
  // Degree => Students
  mapping(string => address[]) degree2Students;
  // Student => Degrees
  mapping(address => string[]) student2Degrees;

  constructor() public {
    owner_ = msg.sender;
  }

  function addStudent(address studentID, string memory degreeID) external {
    degree2Students[degreeID].push(studentID);
    student2Degrees[studentID].push(degreeID);
    add(degreeID);
  }

  function getDegreesByStudent(address studentID) external view returns (string[] memory) {
    return student2Degrees[studentID];
  }

  function getStudentsByDegree(string memory degreeID) external view returns (address[] memory) {
    return degree2Students[degreeID];
  }
}
