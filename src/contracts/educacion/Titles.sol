//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/StorageStringBasic.sol";

struct Title { // Struct
  string id;
  string institution_;
  string degree_;

  address student_;

  uint16 year_;

  string state_;
}

contract Titles is StorageStringBasic {

  address private owner_;  
  mapping(string => Title) titles_;
  mapping(address => string[]) student2Titles_;
  mapping(string => string[]) inst2titles_;

  constructor() public {
    owner_ = msg.sender;
  }

  function emitTitle(string memory id, string memory institution, string memory degree, address student, uint16 year) external notExist(id) {
    titles_[id] = Title(id, institution, degree, student, year, "Active");
    student2Titles_[student].push(id);
    inst2titles_[institution].push(id);
    add(id);
  }

  function getTitle(string memory id) external view returns (Title memory) {
    return titles_[id];
  }

  function getTitles() external view returns (string[] memory) {
    return ids_;
  }

  function getTitlesByStudent(address id) external view returns (string[] memory) {
    return student2Titles_[id];
  }

  function getTitlesByInstitution(string memory id) external view returns (string[] memory) {
    return inst2titles_[id];
  }

  function cancelTitle(string memory id) external {
    Title storage title = titles_[id];
    title.state_ = "Inactive";
  }
}
