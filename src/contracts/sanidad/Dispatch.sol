//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/SpanishDNS.sol";
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

    SpanishDNS private dns = SpanishDNS(0xa1E47689f396fED7d18D797d9D31D727d2c0d483);
    Prescription private pres;
    Pharmacist private phar;

    constructor() public
    {
        owner_ = msg.sender;

       // pres = Prescription(dns.getAddress("Prescription"));
       // phar = Pharmacist(dns.getAddress("Pharmacist"));
    }

    modifier notExpired(uint prescriptionID)
    {
        require(pres.isExpired(prescriptionID) == false, "The prescription has expired, I cant dispatch it");
        _;
    }

    modifier isActive()
    {
        require(phar.isActive(msg.sender) == true, "The pharmacist is inactive.");
        _;
    }

    function dispatch(uint prescriptionID, address pharmacist,
                    uint day, uint month, uint year) external
    {
        dispatches_[prescriptionID].push(tDispatch(prescriptionID, day, month, year, pharmacist));
    }

    function getDispatches(uint prescriptionID) external view returns (tDispatch[] memory)
    {
        return dispatches_[prescriptionID];
    }
}
