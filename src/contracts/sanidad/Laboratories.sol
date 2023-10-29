//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

struct tLaboratory
{
    address id_;
    string name_;
    string street_;
    string city_;
    string country_;

    address owner_;
}

contract Laboratory
{
    mapping(address => tLaboratory) laboratories_;
}