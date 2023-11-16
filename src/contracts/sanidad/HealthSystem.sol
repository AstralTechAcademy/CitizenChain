//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./Prescription.sol";
import "./Doctors.sol";
import "./Dispatch.sol";
import "./Laboratories.sol";
import "./Medicines.sol";
import "./Pharmacists.sol";
import "../common/Dns.sol";

contract HealthSystem
{
    address private owner_;
    Dns dns = Dns(0x7B4982e1F7ee384F206417Fb851a1EB143c513F9);
    mapping(string => address) private contracts_;
    constructor() public
    {
        owner_ = msg.sender;
        contracts_["Doctors"] = 0xa1E47689f396fED7d18D797d9D31D727d2c0d483;
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
                    address patient,
                    string memory medicine, uint day, uint month, uint year) external //isDoctorActive()
    {
        Prescription(dns.getAddress("Prescription")).prescribe(id, patient, msg.sender, medicine, day, month, year);
    }

    function dispatch(uint prescriptionID, address pharmacist,
                    uint day, uint month, uint year) external isPharmacistActive() prescriptionNotExpired(prescriptionID)
    {
        Dispatch(contracts_["Dispatch"]).dispatch(prescriptionID, pharmacist, day, month, year);
    }

    function expire(uint id) external isDoctorActive()
    {
        Prescription(dns.getAddress("Prescription")).expire(id);
    }

    function addPharmacist(address id, uint collegiateID) external
    {
        Pharmacist sc = Pharmacist(dns.getAddress("Pharmacist"));
        sc.addPharmacist(id, collegiateID, ePharmacistState.ACTIVE);
    }    

    function addLaboratory(string memory id, string memory name, string memory street, string memory city, string memory country, address owner) external
    {
        Laboratory sc = Laboratory(dns.getAddress("Laboratory"));
        sc.addLab(id, name, street, city, country, owner);
    }

    function addMedicine(string memory id, string memory name, string memory laboratory) external
    {
        Medicine sc = Medicine(dns.getAddress("Medicine"));
        sc.addMedicine(id, name, laboratory, eState.DEVELOPMENT);
    }

    function getMedicine(string memory id) external view returns (tMedicine memory) 
    {
        return Medicine(dns.getAddress("Medicine")).get(id);
    }

    function listLaboratories() external view returns (string[] memory)
    {
        return Laboratory(dns.getAddress("Laboratory")).list();
    }

    function listPharmacists() external view returns (address[] memory)
    {
        return Pharmacist(dns.getAddress("Pharmacist")).list();
    }

    function listMedicines() external view returns (string[] memory)
    {
        return Medicine(dns.getAddress("Medicine")).list();
    }        

    function getPrescriptions() external view returns (uint[] memory)
    {
        return Prescription(dns.getAddress("Prescription")).getPrescriptions();
    }

    function getPrescription(uint id) external view returns (Item memory)
    {
        return Prescription(dns.getAddress("Prescription")).getPrescription(id);
    }

    function getPrescriptionByPatient(address id) external view returns (uint[] memory)
    {
        return Prescription(dns.getAddress("Prescription")).getPrescriptionByPatient(id);
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