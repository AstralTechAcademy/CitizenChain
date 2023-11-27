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
    Dns dns = Dns(0x55a4eDd8A2c051079b426E9fbdEe285368824a89);
    mapping(string => address) private contracts_;
    bool contractActive;
    bool modifierActive;    
    constructor() public
    {
        owner_ = msg.sender;
        contractActive = true;
        modifierActive = true;
    }

    modifier isAdmin()
    {
        if(modifierActive)
        {
            AccessControl ac = AccessControl(dns.getAddress("AC"));
            require(ac.has("health.admin", msg.sender), "The sender cannot perform this action");
        }
        _;
    }

    modifier isPerson(address id)
    {
        if(modifierActive)
        {
            CivilRegistry ac = CivilRegistry(dns.getAddress("Civil"));
            require(ac.alive(id), "The address is not a person registered in the civil registry");
        }
        _;
    }

    modifier isDoctorActive()
    {
        if(modifierActive)
        {
            require(Doctor(dns.getAddress("Doctors")).isActive(msg.sender) == true, "The sender is not an active doctor");
        }
        _;
    }

    modifier isPharmacistActive()
    {
        if(modifierActive)
        {
            require(Pharmacist(dns.getAddress("Pharmacist")).isActive(msg.sender) == true, "The sender is not an active pharmacist");
        }
        _;
    }

    modifier prescriptionNotExpired(uint id)
    {
        if(modifierActive)
        {
            require(Prescription(dns.getAddress("Prescription")).isExpired(id) == false, "The prescription has expired");
        }
        _;        
    }

    function prescribe(uint id,
                    address patient,
                    string memory medicine, uint day, uint month, uint year) external isDoctorActive()
    {
        Prescription(dns.getAddress("Prescription")).prescribe(id, patient, msg.sender, medicine, day, month, year);
    }

    function dispatch(uint prescriptionID,
                    uint day, uint month, uint year) external isPharmacistActive() prescriptionNotExpired(prescriptionID)
    {
        Dispatch(dns.getAddress("Dispatch")).dispatch(prescriptionID, msg.sender, day, month, year);
    }

    function expire(uint id) external isDoctorActive()
    {
        Prescription(dns.getAddress("Prescription")).expire(id);
    }

    function addDoctor(address id, string memory speciality, uint collegiateID, eDoctorState status) external isAdmin() isPerson(id)
    {
        Doctor(dns.getAddress("Doctors")).addDoctor(id, speciality, collegiateID, status);
    }

    function addPharmacist(address id, uint collegiateID) external
    {
        Pharmacist sc = Pharmacist(dns.getAddress("Pharmacist"));
        sc.addPharmacist(id, collegiateID, ePharmacistState.ACTIVE);
    }    

    function addLaboratory(string memory id, string memory name, string memory street, string memory city, string memory country, address owner) external isAdmin() isPerson(owner)
    {
        Laboratory(dns.getAddress("Laboratory")).addLab(id, name, street, city, country, owner);
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

    function getDispatchesByPrescription(uint id) external view returns (tDispatch[] memory)
    {
        return Dispatch(dns.getAddress("Dispatch")).getDispatchesByPrescription(id);
    }

    function getBlockNumber() external view returns (uint)
    {
        return block.number;
    }
}