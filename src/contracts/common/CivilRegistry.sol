//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/SpanishContract.sol";

struct DNI {
    address id;
    string nif;

    string street;
    string number;
}


struct tPerson { // Struct
  address id;
  address nif;
  string name_;
  string surname1_;
  string surname2_;

  //address parent1;
  //address parent2;

  //uint8 year;
  //uint8 month;
  //uint8 day;

  bool alive_;
}

contract CivilRegistry {

  address private owner_;
  uint256 number = 15;

  mapping(address => tPerson) private registry_;
  mapping(address => bool) private exist_;
  address[] addresses_;

  constructor() public {
    owner_ = msg.sender;
  }

  function add(address id, string memory name, string memory surname1, string memory surname2) external
  {
    require(msg.sender == owner_);
    require(exist_[id] == false, "[CivilRegistry::add] The person already registered");
    registry_[id] = tPerson(id, id, name, surname1, surname2, true);
    exist_[id] = true;
  }

  function newBirth(address id, string memory name, string memory surname1, string memory surname2) external
  {
    require(msg.sender == owner_);
    require(exist_[id] == false, "[CivilRegistry::add] The person already registered");
    registry_[id] = tPerson(id, id, name, surname1, surname2, true);
    exist_[id] = true;
    addresses_.push(id);
  }

  function list() external view returns (address[] memory)
  {
    return addresses_;
  }

  function alive(address id) external view returns (bool)
  {
    require(exist_[id] == true, "The person is not in civil registry");
    return registry_[id].alive_ == true;
  }

  function showPerson(address id) external view returns (tPerson memory)
  {
      require(exist_[id] == true, "[AccessControl::showPerson] The person id does not exist");
      return registry_[id];
  }

}