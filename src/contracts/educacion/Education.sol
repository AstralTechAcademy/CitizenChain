//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./EducationAC.sol";
import "./Institutions.sol";
import "./InstitutionsDegrees.sol";
import "./DegreesStudents.sol";
import "./Title.sol";
import "./Degrees.sol";
import "../common/Dns.sol";

contract AcademicApp
{
  address private owner_;
  Dns dns = Dns(0x55a4eDd8A2c051079b426E9fbdEe285368824a89);
  mapping(string => address) private contracts_;
  constructor() public
  {
      owner_ = msg.sender;
  }


  function addInstitution(string memory id, string memory name) external {
    Institutions(dns.getAddress("Institutions")).addInstitution(id, name);
  }

  function addDegree(string memory degreeID, string memory name, string memory institutionID) external {
    Degrees(dns.getAddress("Degrees")).addDegree(degreeID, name);
    InstitutionsDegrees(dns.getAddress("InstitutionsDegrees")).addDegree(institutionID, degreeID);
  }

  function addStudent(address studentID, string memory degreeID) external {
    DegreesStudents(dns.getAddress("DegreesStudents")).addStudent(studentID, degreeID);
  }

  function emitTitle(string memory id, string memory institution, string memory degree, address student, uint16 year) external {
    Titles(dns.getAddress("Titles")).emitTitle(id, institution, degree, student, year);
  }

  function listInstitutions() external view returns (string[] memory) {
    return Institutions(dns.getAddress("Institutions")).getInstitutions();
  }

  function getInstitutions() external view returns (string[] memory) {
    return Institutions(dns.getAddress("Institutions")).getInstitutions();
  }

  function getInstitution(string memory id) external view returns (Institution memory)  {
    return Institutions(dns.getAddress("Institutions")).getInstitution(id);
  }

  function getDegreesByInstitution(string memory id) external view returns (string[] memory)  {
    return InstitutionsDegrees(dns.getAddress("InstitutionsDegrees")).getDegreesByInstitution(id);
  }

  function getDegree(string memory id) external view returns (Degree memory)  {
    return Degrees(dns.getAddress("Degrees")).getDegree(id);
  }

  function getDegreesByStudent(address studentID) external view returns (string[] memory) {
    return DegreesStudents(dns.getAddress("DegreesStudents")).getDegreesByStudent(studentID);
  }

  function getStudentsByDegree(string memory degreeID) external view returns (address[] memory) {
    return DegreesStudents(dns.getAddress("DegreesStudents")).getStudentsByDegree(degreeID);
  }
  
}
