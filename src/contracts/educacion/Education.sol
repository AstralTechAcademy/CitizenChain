//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./EducationAC.sol";
import "./EducationData.sol";
import "../common/Dns.sol";
import "../common/CivilRegistry.sol";

contract AcademicApp
{
  address private owner_;
  Dns dns = Dns(0x52C84043CD9c865236f11d9Fc9F56aa003c1f922);
  mapping(string => address) private contracts_;
  address admin;
  bool contractActive;
  bool modifierActive;
  constructor() public
  {
      owner_ = msg.sender;
      admin = msg.sender;
      contractActive = true;
      modifierActive = true;
  }

  modifier isAdmin() {
    if(modifierActive)
    {
      require(msg.sender == admin, "The signer has not the admin role, this action requires admin role");
    }
    _;
  }

  modifier isAdminAC()
  {
      if(modifierActive)
      {
          AccessControl ac = AccessControl(dns.getAddress("AC"));
          require(ac.has("academic.admin", msg.sender), "The sender cannot perform this action");
      }
      _;
  }  

  modifier isActive() {
    if(modifierActive)
    {
      require(contractActive, "The contract has been removed by the admin");
    }
    _;
  }

  modifier isStudentInDegree(string memory degreeID, address studentID)
  {
    if(modifierActive)
    {
      require(EducationData(dns.getAddress("EducationData")).degreeExist(degreeID), "The degree does not exist");
      require(EducationData(dns.getAddress("EducationData")).isStudentInDegree(degreeID, studentID), "The student is not in the degree");
    }
    _;
  }

  modifier notStudentInDegree(string memory degreeID, address studentID)
  {
    if(modifierActive)
    {
      require(EducationData(dns.getAddress("EducationData")).degreeExist(degreeID), "The degree does not exist");
      require(!EducationData(dns.getAddress("EducationData")).isStudentInDegree(degreeID, studentID), "The student is in the degree");
    }
    _;
  }

  modifier isInstitutionSigner(string memory institutionID)
  {
    if(modifierActive)
    {
      require(EducationData(dns.getAddress("EducationData")).isSigner(msg.sender, institutionID), "The sender is not a signer for this intitution");
    }
    _;
  }

  modifier isDegreeInInstitution(string memory degreeID, string memory institutionID)
  {
    if(modifierActive)
    {
      require(EducationData(dns.getAddress("EducationData")).isDegreeInInstitution(degreeID, institutionID), "The degree is not available in this institution");
    }
    _;
  }

  modifier isPersonAlive(address person)
  {
    if(modifierActive)
    {
      require(CivilRegistry(dns.getAddress("Civil")).alive(person), "The person is not active");
    }
    _;
  }

  function addInstitution(string memory id, string memory name) external isAdmin()  isActive() {
    EducationData(dns.getAddress("EducationData")).addInstitution(id, name);
  }

  function addDegree(string memory degreeID, string memory name, string memory institutionID) external isAdmin() isActive() {
    EducationData(dns.getAddress("EducationData")).addDegree(degreeID, name);
    EducationData(dns.getAddress("EducationData")).addDegreeInInstitution(institutionID, degreeID);
  }

  function addStudent(address student, string memory institution, string memory degree) external isActive() isPersonAlive(student) notStudentInDegree(degree, student) isInstitutionSigner(institution) isDegreeInInstitution(degree, institution) {
    EducationData(dns.getAddress("EducationData")).addStudent(student, degree);
  }

  function emitTitle(string memory id, string memory institution, string memory degree, address student, uint16 year) external isActive() isInstitutionSigner(institution) isDegreeInInstitution(degree, institution) isStudentInDegree(degree, student) {
    EducationData(dns.getAddress("EducationData")).emitTitle(id, institution, degree, student, year);
  }

  function listInstitutions() external view isActive() returns (string[] memory)  {
    return EducationData(dns.getAddress("EducationData")).getInstitutions();
  }

  function getInstitutions() external view isActive()  returns (string[] memory) {
    return EducationData(dns.getAddress("EducationData")).getInstitutions();
  }

  function getInstitution(string memory id) external view isActive()  returns (Institution memory)  {
    return EducationData(dns.getAddress("EducationData")).getInstitution(id);
  }

  function getDegreesByInstitution(string memory id) external view isActive()  returns (string[] memory) {
    return EducationData(dns.getAddress("EducationData")).getDegreesByInstitution(id);
  }

  function getDegree(string memory id) external view isActive()  returns (Degree memory) {
    return EducationData(dns.getAddress("EducationData")).getDegree(id);
  }

  function getDegreesByStudent(address studentID) external view isActive() returns (string[] memory) {
    return EducationData(dns.getAddress("EducationData")).getDegreesByStudent(studentID);
  }

  function getTitlesByStudent(address studentID) external view isActive() returns (string[] memory) {
    return EducationData(dns.getAddress("EducationData")).getTitlesByStudent(studentID);
  }

  function getStudentsByDegree(string memory degreeID) external view isActive() returns (address[] memory) {
    return EducationData(dns.getAddress("EducationData")).getStudentsByDegree(degreeID);
  }

  function getTitles() external view isActive() returns (string[] memory) {
    return EducationData(dns.getAddress("EducationData")).getTitles();
  }

  function getTitle(string memory titleID) external view isActive() returns (Title memory) {
    return EducationData(dns.getAddress("EducationData")).getTitle(titleID);
  }

  function removeContract() external isAdmin() isActive() {
    contractActive = false;
  }
  
}
