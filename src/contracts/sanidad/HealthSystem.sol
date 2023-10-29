//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./Prescription.sol";
import "./Doctors.sol";
import "./Dispatch.sol";
import "../common/SpanishDNS.sol";

contract HealthSystem
{
    address private owner_;
    SpanishDNS dns = SpanishDNS(0x5dC0d3A9B168034f7aE890Bcce125DdEBF936987);
    mapping(string => address) private contracts_;
    constructor() public
    {
        owner_ = msg.sender;
        contracts_["Doctors"] = 0xF4FED7834Fb095180b892178Ce76e136B2Ac2824;
       // contracts_["Dispatch"] = dns.getAddress("Dispatch");
       contracts_["Prescription"] = 0x17cE660620Cf813eC70B514d77B9360Baf1EDB32;
       // contracts_["Pharmacist"] = dns.getAddress("Pharmacist");

    }

    modifier isDoctorActive()
    {
        require(Doctor(contracts_["Doctors"]).isActive(msg.sender) == true, "The sender is not an active doctor");
        _;
    }

    function prescribe(uint id,
                    address patient, address doctor, 
                    uint medicine, uint day, uint month, uint year) external isDoctorActive()
    {
        Prescription(contracts_["Prescription"]).prescribe(id, patient, doctor, medicine, day, month, year);
    }

    function dispatch(uint prescriptionID, address pharmacist,
                    uint day, uint month, uint year) external
    {
        Pharmacist(contracts_["Pharmacist"]).isActive(msg.sender);
        Dispatch(contracts_["Dispatch"]).dispatch(prescriptionID, pharmacist, day, month, year);
    }
}