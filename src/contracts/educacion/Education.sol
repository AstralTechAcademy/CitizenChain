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

  modifier isOwner() {
    require(owner_ == msg.sender,
      "Caller is not the owners"
    );
    _;
  }

  function owner() external view returns (address) {
    return owner_;
  }
}
