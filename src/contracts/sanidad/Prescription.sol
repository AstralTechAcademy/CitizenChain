//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

struct Item
{
    uint id_;
    address patient_;
    address doctor_;

    uint medicine_;

    uint day_;
    uint month_;
    uint year_;

    bool expired_;
}

contract Prescription
{
    address private owner_;  
    mapping(uint => Item) records_;
    mapping(uint => bool) exist_;
    mapping(address => uint[]) patient2Records_;

    constructor() public
    {
        owner_ = msg.sender;
    }

    modifier notExist(uint id)
    {
        require(exist_[id] == false, "The presciption exist");
        _;
    }

    modifier exist(uint id)
    {
        require(exist_[id] == true, "The presciption does not exist");
        _;
    }

    function prescribe(uint id,
                    address patient, address doctor, 
                    uint medicine, uint day, uint month, uint year) external notExist(id)
    {
        records_[id] = Item(id, patient, doctor, medicine, day, month, year, false);
        patient2Records_[patient].push(id);
        exist_[id] = true;
    }

    function isExpired(uint id) external view returns (bool)
    {
        return records_[id].expired_;
    }

    function expire(uint id) external exist(id)
    {
        records_[id].expired_ = true;
    }

    function getPrescription(uint id) external view exist(id) returns (Item memory)
    {
        return records_[id];
    }

    function getPrescriptionByPatient(address id) external view returns (uint[] memory)
    {
        return patient2Records_[id];
    }
}