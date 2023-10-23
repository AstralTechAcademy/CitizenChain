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


    uint dayDispatched_;
    uint monthDispatched_;
    uint yearDispatched_;
    address pharmacist_;

    bool dispatched_;
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
        records_[id] = Item(id, patient, doctor, medicine, day, month, year, false, 0, 0, 0, address(0), false);
        patient2Records_[patient].push(id);
    }

    function dispatch(uint id, address patient, address pharmacist,
                    uint day, uint month, uint year) external
    {
        Item storage record = records_[id];
        record.pharmacist_ = pharmacist;
        record.dayDispatched_ = day;
        record.monthDispatched_ = month;
        record.yearDispatched_ = year;
        record.dispatched_ = true;
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