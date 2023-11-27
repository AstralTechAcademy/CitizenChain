//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./EducationAC.sol";
import "./Institutions.sol";
import "./InstitutionsDegrees.sol";
import "./DegreesStudents.sol";
import "./Titles.sol";
import "./Degrees.sol";
import "../common/Dns.sol";
import "../common/CivilRegistry.sol";

contract AcademicApp
{
  address private owner_;
  Dns dns = Dns(0x55a4eDd8A2c051079b426E9fbdEe285368824a89);
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
      require(Degrees(dns.getAddress("Degrees")).degreeExist(degreeID), "The degree does not exist");
      require(DegreesStudents(dns.getAddress("DegreesStudents")).isStudentInDegree(degreeID, studentID), "The student is not in the degree");
    }
    _;
  }

  modifier notStudentInDegree(string memory degreeID, address studentID)
  {
    if(modifierActive)
    {
      require(Degrees(dns.getAddress("Degrees")).degreeExist(degreeID), "The degree does not exist");
      require(!DegreesStudents(dns.getAddress("DegreesStudents")).isStudentInDegree(degreeID, studentID), "The student is in the degree");
    }
    _;
  }

  modifier isInstitutionSigner(string memory institutionID)
  {
    if(modifierActive)
    {
      require(Institutions(dns.getAddress("Institutions")).isSigner(msg.sender, institutionID), "The sender is not a signer for this intitution");
    }
    _;
  }

  modifier isDegreeInInstitution(string memory degreeID, string memory institutionID)
  {
    if(modifierActive)
    {
      require(InstitutionsDegrees(dns.getAddress("InstitutionsDegrees")).isDegreeInInstitution(degreeID, institutionID), "The degree is not available in this institution");
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
    Institutions(dns.getAddress("Institutions")).addInstitution(id, name);
  }

  function addDegree(string memory degreeID, string memory name, string memory institutionID) external isAdmin() isActive() {
    Degrees(dns.getAddress("Degrees")).addDegree(degreeID, name);
    InstitutionsDegrees(dns.getAddress("InstitutionsDegrees")).addDegree(institutionID, degreeID);
  }

  function addStudent(address student, string memory institution, string memory degree) external isActive() isPersonAlive(student) notStudentInDegree(degree, student) isInstitutionSigner(institution) isDegreeInInstitution(degree, institution) {
    DegreesStudents(dns.getAddress("DegreesStudents")).addStudent(student, degree);
  }

  function emitTitle(string memory id, string memory institution, string memory degree, address student, uint16 year) external isActive() isInstitutionSigner(institution) isDegreeInInstitution(degree, institution) isStudentInDegree(degree, student) {
    Titles(dns.getAddress("Titles")).emitTitle(id, institution, degree, student, year);
  }

  function listInstitutions() external view isActive() returns (string[] memory)  {
    return Institutions(dns.getAddress("Institutions")).getInstitutions();
  }

  function getInstitutions() external view isActive()  returns (string[] memory) {
    return Institutions(dns.getAddress("Institutions")).getInstitutions();
  }

  function getInstitution(string memory id) external view isActive()  returns (Institution memory)  {
    return Institutions(dns.getAddress("Institutions")).getInstitution(id);
  }

  function getDegreesByInstitution(string memory id) external view isActive()  returns (string[] memory) {
    return InstitutionsDegrees(dns.getAddress("InstitutionsDegrees")).getDegreesByInstitution(id);
  }

  function getDegree(string memory id) external view isActive()  returns (Degree memory) {
    return Degrees(dns.getAddress("Degrees")).getDegree(id);
  }

  function getDegreesByStudent(address studentID) external view isActive() returns (string[] memory) {
    return DegreesStudents(dns.getAddress("DegreesStudents")).getDegreesByStudent(studentID);
  }

  function getTitlesByStudent(address studentID) external view isActive() returns (string[] memory) {
    return Titles(dns.getAddress("Titles")).getTitlesByStudent(studentID);
  }

  function getStudentsByDegree(string memory degreeID) external view isActive() returns (address[] memory) {
    return DegreesStudents(dns.getAddress("DegreesStudents")).getStudentsByDegree(degreeID);
  }

  function getTitles() external view isActive() returns (string[] memory) {
    return Titles(dns.getAddress("Titles")).getTitles();
  }

  function getTitle(string memory titleID) external view isActive() returns (Title memory) {
    return Titles(dns.getAddress("Titles")).getTitle(titleID);
  }

  function removeContract() external isAdmin() isActive() {
    contractActive = false;
  }
  
}
