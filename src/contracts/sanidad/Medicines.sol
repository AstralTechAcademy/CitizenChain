//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/StorageStringBasic.sol";

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
    string id_;
    string name_;
    string laboratory_;

    eState state_;
}

contract Medicine is StorageStringBasic
{
    address private owner_;
    mapping(string => tMedicine) medicines_;

    constructor() public
    {
        owner_ = msg.sender;
    }

    function addMedicine(string memory id, string memory name, string memory laboratory, eState state) external notExist(id)
    {
        medicines_[id] = tMedicine(id, name, laboratory, state);
        add(id);
    }

    function get(string memory id) external view exist(id) returns (tMedicine memory) 
    {
        return medicines_[id];
    }

    function changeState(string memory id, eState state) external exist(id)
    {
        medicines_[id].state_ = state;
    }

    function remove(string memory id) external exist(id) 
    {
        delete medicines_[id];
    }

    function list() external view returns(string[] memory) 
    {
        return ids_;
    }
}