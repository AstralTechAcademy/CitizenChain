//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/Dns.sol";
import "./Prescription.sol";
import "./Pharmacists.sol";

struct tDispatch
{
    uint prescriptionID_;
    uint dayDispatched_;
    uint monthDispatched_;
    uint yearDispatched_;
    address pharmacist_;
}

contract Dispatch
{
    address private owner_;  
    mapping(uint => tDispatch[]) dispatches_;
    mapping(uint => bool) exist_;

    constructor() public
    {
        owner_ = msg.sender;
    }

    function dispatch(uint prescriptionID, address pharmacist,
                    uint day, uint month, uint year) external
    {
        dispatches_[prescriptionID].push(tDispatch(prescriptionID, day, month, year, pharmacist));
        exist_[prescriptionID] = true;
    }

    function getDispatchesByPrescription(uint id) external view returns (tDispatch[] memory)
    {
        return dispatches_[id];
    }
}
