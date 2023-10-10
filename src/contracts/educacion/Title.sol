//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "../common/SpanishContract.sol";

struct Voter { // Struct
  uint id;
  address owner_;
  string name_;
}

contract TitleRegistry is SpanishContract {

  address private owner_;
  uint256 number = 15;

  constructor() public {
    owner_ = msg.sender;
  }

  modifier isAcademicInstitution() {
    require(ac.isAcademicInstitution1(msg.sender),
      "Caller is not an academic institution"
    );
    _;
  }

  function register(uint256 num) external isAcademicInstitution {
    number = number + num;
  }

  function retrieve() external view returns (uint256) {
    return number;
  }

  function owner() external view returns (address) {
    return owner_;
  }
}
