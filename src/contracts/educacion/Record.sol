//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./EducationAC.sol";

struct Item
{
    uint id_;
    address degree_;
    address subject_;
    address student_;
    address teacher_;

    uint mark_;

    uint year_;
}

contract Record is EducationAC
{
    address private owner_;  
    mapping(uint => Item) records_;
    mapping(address => uint[]) students2Records_;

    constructor() public
    {
        owner_ = msg.sender;
    }

    function register(uint id, address degree, 
                    address subject, address student, address teacher, 
                    uint mark, uint year) external
    {
        records_[id] = Item(id, degree, subject, student, teacher, mark, year);
        students2Records_[student].push(id);
    }

    function getRecord(uint id) external view returns (Item memory)
    {
        return records_[id];
    }

    function getRecordsByStudent(address id) external view returns (uint[] memory)
    {
        return students2Records_[id];
    }
}