//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./HealthData.sol";
import "../common/Dns.sol";
import "../common/AccessControl.sol";
import "../common/CivilRegistry.sol";

contract HealthSystem
{
    address private owner_;
    Dns dns = Dns(0x52C84043CD9c865236f11d9Fc9F56aa003c1f922);
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
            require(HealthData(dns.getAddress("HealthData")).isActive(msg.sender) == true, "The sender is not an active doctor");
        }
        _;
    }

    modifier isPharmacistActive()
    {
        if(modifierActive)
        {
            require(HealthData(dns.getAddress("HealthData")).isActive(msg.sender) == true, "The sender is not an active pharmacist");
        }
        _;
    }

    modifier prescriptionNotExpired(uint id)
    {
        if(modifierActive)
        {
            require(HealthData(dns.getAddress("HealthData")).isExpired(id) == false, "The prescription has expired");
        }
        _;        
    }

    function prescribe(uint id,
                    address patient,
                    string memory medicine, uint day, uint month, uint year) external isDoctorActive()
    {
        HealthData(dns.getAddress("HealthData")).prescribe(id, patient, msg.sender, medicine, day, month, year);
    }

    function dispatch(uint prescriptionID,
                    uint day, uint month, uint year) external isPharmacistActive() prescriptionNotExpired(prescriptionID)
    {
        HealthData(dns.getAddress("HealthData")).dispatch(prescriptionID, msg.sender, day, month, year);
    }

    function expire(uint id) external isDoctorActive()
    {
        HealthData(dns.getAddress("HealthData")).expire(id);
    }

    function addDoctor(address id, string memory speciality, uint collegiateID, eDoctorState status) external isAdmin() isPerson(id)
    {
        HealthData(dns.getAddress("HealthData")).addDoctor(id, speciality, collegiateID, status);
    }

    function addPharmacist(address id, uint collegiateID) external
    {
        HealthData sc = HealthData(dns.getAddress("HealthData"));
        sc.addPharmacist(id, collegiateID, ePharmacistState.ACTIVE);
    }    

    function addLaboratory(string memory id, string memory name, string memory street, string memory city, string memory country, address owner) external isAdmin() isPerson(owner)
    {
        HealthData(dns.getAddress("HealthData")).addLab(id, name, street, city, country, owner);
    }

    function addMedicine(string memory id, string memory name, string memory laboratory) external
    {
        HealthData sc = HealthData(dns.getAddress("HealthData"));
        sc.addMedicine(id, name, laboratory, eState.DEVELOPMENT);
    }

    function getMedicine(string memory id) external view returns (tMedicine memory) 
    {
        return HealthData(dns.getAddress("HealthData")).getMedicine(id);
    }

    function listDoctors() external view returns (address[] memory)
    {
        return HealthData(dns.getAddress("HealthData")).getDoctors();
    }

    function listLaboratories() external view returns (string[] memory)
    {
        return HealthData(dns.getAddress("HealthData")).getLaboratories();
    }

    function listPharmacists() external view returns (address[] memory)
    {
        return HealthData(dns.getAddress("HealthData")).getPharmacists();
    }

    function listMedicines() external view returns (string[] memory)
    {
        return HealthData(dns.getAddress("HealthData")).getMedicines();
    }        

    function getPrescriptions() external view returns (uint[] memory)
    {
        return HealthData(dns.getAddress("HealthData")).getPrescriptions();
    }

    function getPrescription(uint id) external view returns (Item memory)
    {
        return HealthData(dns.getAddress("HealthData")).getPrescription(id);
    }

    function getPrescriptionByPatient(address id) external view returns (uint[] memory)
    {
        return HealthData(dns.getAddress("HealthData")).getPrescriptionByPatient(id);
    }

    function getDispatchesByPrescription(uint id) external view returns (tDispatch[] memory)
    {
        return HealthData(dns.getAddress("HealthData")).getDispatchesByPrescription(id);
    }

    function getBlockNumber() external view returns (uint)
    {
        return block.number;
    }
}