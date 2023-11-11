//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/StorageStringBasic.sol";

struct tLaboratory
{
    string id_;
    string name_;
    string street_;
    string city_;
    string country_;

    address owner_;
}

contract Laboratory is StorageStringBasic
{
    mapping(string => tLaboratory) laboratories_;

    function addLab(string memory id, string memory name, string memory street, string memory city, string memory country, address owner) external notExist(id)
    {
        laboratories_[id] = tLaboratory(id, name, street, city, country, owner);
        add(id);
    }

    function get(string memory id) external view exist(id) returns (tLaboratory memory) 
    {
        return laboratories_[id];
    }

    function list() external view returns (string[] memory) 
    {
        return ids_;
    }
}