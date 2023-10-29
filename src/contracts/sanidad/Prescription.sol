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
    mapping(address => uint[]) patient2Records_;

    constructor() public
    {
        owner_ = msg.sender;
    }



    function prescribe(uint id,
                    address patient, address doctor, 
                    uint medicine, uint day, uint month, uint year) external
    {
        records_[id] = Item(id, patient, doctor, medicine, day, month, year, false);
        patient2Records_[patient].push(id);
    }

    function isExpired(uint id) external view returns (bool)
    {
        return records_[id].expired_;
    }

    function getRecord(uint id) external view returns (Item memory)
    {
        return records_[id];
    }

    function getRecordsByPatient(address id) external view returns (uint[] memory)
    {
        return patient2Records_[id];
    }
}