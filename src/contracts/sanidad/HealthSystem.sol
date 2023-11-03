//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./Prescription.sol";
import "./Doctors.sol";
import "./Dispatch.sol";
import "../common/Dns.sol";

contract HealthSystem
{
    address private owner_;
    Dns dns = Dns(0x5dC0d3A9B168034f7aE890Bcce125DdEBF936987);
    mapping(string => address) private contracts_;
    constructor() public
    {
        owner_ = msg.sender;
        contracts_["Doctors"] = 0xf1db872E6454D553686b088c1Ea3889cF2FE3ABe;
        contracts_["Dispatch"] = 0x9c4cD519100100ec3B3c7bff3Df7f52b575F5558;
        contracts_["Prescription"] = 0x224A8113006f2c986217A832e364D676C19C7c21;
        contracts_["Pharmacist"] = 0x20BC04ad10B6300F542e694f8c3aB44DB8Caac65;
    }

    modifier isDoctorActive()
    {
        require(Doctor(contracts_["Doctors"]).isActive(msg.sender) == true, "The sender is not an active doctor");
        _;
    }

    modifier isPharmacistActive()
    {
        require(Pharmacist(contracts_["Pharmacist"]).isActive(msg.sender) == true, "The sender is not an active pharmacist");
        _;
    }

    modifier prescriptionNotExpired(uint id)
    {
        require(Prescription(contracts_["Prescription"]).isExpired(id) == false, "The prescription has expired");
        _;
    }

    function prescribe(uint id,
                    address patient, address doctor, 
                    uint medicine, uint day, uint month, uint year) external isDoctorActive()
    {
        Prescription(contracts_["Prescription"]).prescribe(id, patient, doctor, medicine, day, month, year);
    }

    function dispatch(uint prescriptionID, address pharmacist,
                    uint day, uint month, uint year) external isPharmacistActive() prescriptionNotExpired(prescriptionID)
    {
        Dispatch(contracts_["Dispatch"]).dispatch(prescriptionID, pharmacist, day, month, year);
    }

    function expire(uint id) external isDoctorActive()
    {
        Prescription(contracts_["Prescription"]).expire(id);
    }

    function getPrescription(uint id) external view returns (Item memory)
    {
        return Prescription(contracts_["Prescription"]).getPrescription(id);
    }

    function getPrescriptionByPatient(address id) external view returns (uint[] memory)
    {
        return Prescription(contracts_["Prescription"]).getPrescriptionByPatient(id);
    }

    function getDispatches(uint prescriptionID) external view returns (tDispatch[] memory)
    {
        return Dispatch(contracts_["Dispatch"]).getDispatches(prescriptionID);
    }

    function getBlockNumber() external view returns (uint)
    {
        return block.number;
    }
}