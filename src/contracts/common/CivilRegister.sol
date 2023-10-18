//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "../common/SpanishContract.sol";

struct DNI {
    address id;
    string nif;

    string street;
    string number;
}


struct Person { // Struct
  address id;
  address nif;
  string name_;
  string surname1_;
  string surname2_;

  address parent1;
  address parent2;

  uint8 year;
  uint8 month;
  uint8 day;
}

contract CivilRegistry is SpanishContract {

  address private owner_;
  uint256 number = 15;

  constructor() public {
    owner_ = msg.sender;
  }

  modifier isCivilRegistry() {
    require(ac.isCivilRegistry(msg.sender),
      "Caller is not a civil registry"
    );
    _;
  }
}