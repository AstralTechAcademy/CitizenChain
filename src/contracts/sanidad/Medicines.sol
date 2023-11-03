//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/StorageUintBasic.sol";

enum eState 
{
    DEVELOPMENT,
    PRE_CLINIC,
    CLINIC_TRIAL,
    AUTORIZED,
    UNAUTORIZED
}

struct tMedicine
{
    uint id_;
    string name_;
    address laboratory_;

    eState state_;
}

contract Medicine is StorageUintBasic
{
    address private owner_;
    mapping(uint => tMedicine) medicines_;

    constructor() public
    {
        owner_ = msg.sender;
    }

    function add(uint id, string memory name, address laboratory, eState state) external notExist(id)
    {
        medicines_[id] = tMedicine(id, name, laboratory, state);
        add(id);
    }

    function get(uint id) external view exist(id) returns (tMedicine memory) 
    {
        return medicines_[id];
    }

    function changeState(uint id, eState state) external exist(id)
    {
        medicines_[id].state_ = state;
    }

    function remove(uint id) external exist(id) 
    {
        delete medicines_[id];
    }
}