//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./EducationAC.sol";
import "./Institutions.sol";
import "./Title.sol";

contract Education is TitleRegistry, Institutions {

  address private owner_;

  constructor() public {
    owner_ = msg.sender;
  }

  function owner3() external view returns (address) {
    return owner_;
  }
}
