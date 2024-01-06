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
  Dns dns = Dns(0x55a4eDd8A2c051079b426E9fbdEe285368824a89);
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
      AccessControl ac = AccessControl(dns.getAddress("AC"));
      require(msg.sender == admin || ac.has("civil.administration", msg.sender) || ac.has("academic.admin", msg.sender), "The signer has not the admin role, this action requires admin role");
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

  modifier isDirector(string memory institutionID)
  {
    if(modifierActive)
    {
      require(AccessControl(dns.getAddress("AC")).has("academic.director", msg.sender), "The sender has not the director role");
      require(EducationData(dns.getAddress("EducationData")).isDirector(msg.sender, institutionID), "The sender is not a signer for this intitution");
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

  function addInstitution(string memory id, string memory name, address director) external isAdmin()  isActive() {
    EducationData(dns.getAddress("EducationData")).addInstitution(id, name, director);
  }

  function addDegree(string memory degreeID, string memory name, string memory institutionID) external isAdmin() isActive() {
    EducationData(dns.getAddress("EducationData")).addDegree(degreeID, name);
    EducationData(dns.getAddress("EducationData")).addDegreeInInstitution(institutionID, degreeID);
  }

  function addStudent(address student, string memory institution, string memory degree) external isActive() isPersonAlive(student) isDirector(institution) {
    EducationData(dns.getAddress("EducationData")).addStudent(student, degree, institution);
  }

  function emitTitle(string memory id, string memory institution, string memory degree, address student, uint16 year) external isActive() isDirector(institution) {
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
