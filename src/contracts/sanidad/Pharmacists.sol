//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/StorageBasic.sol";

enum ePharmacistState 
{
    INACTIVE,
    ACTIVE
}

struct tPharmacist
{
    address id_;
    uint collegiateID_;

    ePharmacistState status;
}

contract Pharmacist is StorageBasic
{
    address private owner_;
    mapping(address => tPharmacist) pharmacists_;

    constructor() public
    {
        owner_ = msg.sender;
    }

    function addPharmacist(address id, uint collegiateID, ePharmacistState status) external notExist(id)
    {
        pharmacists_[id] = tPharmacist(id, collegiateID, status);
        add(id);
    }

    function isActive(address id) external view exist(id) returns (bool)
    {
        return pharmacists_[id].status == ePharmacistState.ACTIVE;
    }
}