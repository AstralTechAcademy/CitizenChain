//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/StorageBasic.sol";

enum eDoctorState 
{
    INACTIVE,
    ACTIVE
}

struct tDoctor
{
    address id_;
    string speciality_;

    uint collegiateID_;

    eDoctorState status;
}

contract Doctor is StorageBasic
{
    address private owner_;
    mapping(address => tDoctor) private doctors_;

    constructor() public
    {
        owner_ = msg.sender;
    }

    function addDoctor(address id, string memory speciality, uint collegiateID, eDoctorState status) external notExist(id)
    {
        doctors_[id] = tDoctor(id, speciality, collegiateID, status);
        add(id);
    }

    function getDoctor(address id) external view exist(id) returns (tDoctor memory) 
    {
        return doctors_[id];
    }

    function isActive(address id) external view exist(id) returns (bool) 
    {
        return doctors_[id].status == eDoctorState.ACTIVE;
    }
}