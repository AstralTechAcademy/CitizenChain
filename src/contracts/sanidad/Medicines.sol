//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;


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

contract Medicine
{
    address private owner_;
    mapping(uint => tMedicine) medicines_;

    constructor() public
    {
        owner_ = msg.sender;
    }
}