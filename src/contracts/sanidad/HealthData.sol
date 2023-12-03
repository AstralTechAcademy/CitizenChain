//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/StorageStringBasic.sol";

struct tDispatch
{
    uint prescriptionID_;
    uint dayDispatched_;
    uint monthDispatched_;
    uint yearDispatched_;
    address pharmacist_;
}

enum eDoctorState 
{
    INACTIVE,
    ACTIVE
}

struct tDoctor
{
    address id_;
    string speciality_;

    uint collegiateID_;

    eDoctorState status;
}

struct tLaboratory
{
    string id_;
    string name_;
    string street_;
    string city_;
    string country_;

    address owner_;
}

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
    string id_;
    string name_;
    string laboratory_;

    eState state_;
}

enum ePharmacistState 
{
    INACTIVE,
    ACTIVE
}

struct tPharmacist
{
    address id_;
    uint collegiateID_;

    ePharmacistState status;
}

struct Item
{
    uint id_;
    address patient_;
    address doctor_;

    string medicine_;

    uint day_;
    uint month_;
    uint year_;

    bool expired_;
}

contract HealthData {

    address private owner_;  
    mapping(uint => tDispatch[]) dispatches_;
    mapping(uint => bool) exist_;

    mapping(address => tDoctor) private doctors_;
    mapping(address => bool) private doctorsExist_;
    address[] doctorList_;

    mapping(string => tLaboratory) laboratories_;
    mapping(string => bool) private laboratoriesExist_;
    string[] laboratorieList_;

    mapping(string => tMedicine) medicines_;
    mapping(string => bool) private medicinesExist_;
    string[] medicineList_;

    mapping(address => tPharmacist) pharmacists_;
    mapping(address => bool) private pharmacistExist_;
    address[] pharmacistList_;

    mapping(uint => Item) prescriptions_;
    mapping(uint => bool) prescriptionsExist_;
    mapping(address => uint[]) patient2Prescriptions_;
    uint[] prescriptionList_;

    constructor() public
    {
        owner_ = msg.sender;
    }

// MODIFIERS

    modifier doctorExist(address id) {
        require(doctorsExist_[id], "The doctor does not exist");
        _;
    }

    modifier doctorNotExist(address id) {
        require(!doctorsExist_[id], "The doctor already added");
        _;
    }

    modifier laboratorieExist(string memory id) {
        require(laboratoriesExist_[id], "The laboratorie does not exist");
        _;
    }

    modifier laboratorieNotExist(string memory id) {
        require(!laboratoriesExist_[id], "The laboratorie already added");
        _;
    }

    modifier medicineExist(string memory id) {
        require(medicinesExist_[id], "The medicine does not exist");
        _;
    }

    modifier medicineNotExist(string memory id) {
        require(!medicinesExist_[id], "The medicine already added");
        _;
    }

    modifier pharmacistExist(address id) {
        require(pharmacistExist_[id], "The pharmacist does not exist");
        _;
    }

    modifier pharmacistNotExist(address id) {
        require(!pharmacistExist_[id], "The pharmacist already added");
        _;
    }

    modifier prescriptionExist(uint id) {
        require(prescriptionsExist_[id], "The prescription does not exist");
        _;
    }

    modifier prescriptionNotExist(uint id) {
        require(!prescriptionsExist_[id], "The prescription already added");
        _;
    }

 // FUNCTIONS   

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

    // DOCTORS

    event denied(address id);

    function addDoctor(address id, string memory speciality, uint collegiateID, eDoctorState status) external doctorNotExist(id)
    {
        doctors_[id] = tDoctor(id, speciality, collegiateID, status);
        doctorsExist_[id] = true;
        doctorList_.push(id);
    }

    function getDoctor(address id) external view doctorExist(id) returns (tDoctor memory) 
    {
        return doctors_[id];
    }

    function isActive(address id) external view doctorExist(id) returns (bool) 
    {
        return doctors_[id].status == eDoctorState.ACTIVE;
    }

    function getDoctors() external view returns (address[] memory)
    {
        return doctorList_;
    }

    
    // LABORATORIES

    function addLab(string memory id, string memory name, string memory street, string memory city, string memory country, address owner) external laboratorieNotExist(id)
    {
        laboratories_[id] = tLaboratory(id, name, street, city, country, owner);
        laboratoriesExist_[id] = true;
        laboratorieList_.push(id);
    }

    function getLaboratorie(string memory id) external view laboratorieExist(id) returns (tLaboratory memory) 
    {
        return laboratories_[id];
    }

    function getLaboratories() external view returns (string[] memory) 
    {
        return laboratorieList_;
    }

    // MEDICINES

    function addMedicine(string memory id, string memory name, string memory laboratory, eState state) external medicineNotExist(id)
    {
        medicines_[id] = tMedicine(id, name, laboratory, state);
        medicinesExist_[id] = true;
        medicineList_.push(id);
    }

    function getMedicine(string memory id) external view medicineExist(id) returns (tMedicine memory) 
    {
        return medicines_[id];
    }

    function changeState(string memory id, eState state) external medicineExist(id)
    {
        medicines_[id].state_ = state;
    }

    function remove(string memory id) external medicineExist(id) 
    {
        delete medicines_[id];
    }

    function getMedicines() external view returns(string[] memory) 
    {
        return medicineList_;
    }

    // Pharmacist

    function addPharmacist(address id, uint collegiateID, ePharmacistState status) external pharmacistNotExist(id)
    {
        pharmacists_[id] = tPharmacist(id, collegiateID, status);
        pharmacistExist_[id] = true;
        pharmacistList_.push(id);
    }

    function isPharmacistActive(address id) external view pharmacistExist(id) returns (bool)
    {
        return pharmacists_[id].status == ePharmacistState.ACTIVE;
    }

    function changeState(address id, ePharmacistState state) external pharmacistExist(id)
    {
        pharmacists_[id].status = state;
    }

    function getPharmacists() external view returns(address[] memory) 
    {
        return pharmacistList_;
    }

    // Prescription

    function prescribe(uint id,
                    address patient, address doctor, 
                    string memory medicine, uint day, uint month, uint year) external prescriptionNotExist(id)
    {
        prescriptions_[id] = Item(id, patient, doctor, medicine, day, month, year, false);
        patient2Prescriptions_[patient].push(id);
        prescriptionsExist_[id] = true;
        prescriptionList_.push(id);
    }

    function isExpired(uint id) external view returns (bool)
    {
        return prescriptions_[id].expired_;
    }

    function expire(uint id) external prescriptionExist(id)
    {
        prescriptions_[id].expired_ = true;
    }

    function getPrescription(uint id) external view prescriptionExist(id) returns (Item memory)
    {
        return prescriptions_[id];
    }

    function getPrescriptionByPatient(address id) external view returns (uint[] memory)
    {
        return patient2Prescriptions_[id];
    }

    function getPrescriptions() external view returns (uint[] memory)
    {
        return prescriptionList_;
    }

}
