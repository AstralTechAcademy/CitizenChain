//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "../common/StorageStringBasic.sol";

enum eTitleStatus 
{
    INACTIVE,
    ACTIVE
}

struct Title { // Struct
  string id;
  string institution_;
  string degree_;

  address student_;

  uint16 year_;

  eTitleStatus state_;
}

struct Degree {
  string id_;
  string name_;
}

struct Institution {
  string id_; // wallet institution
  string name_;
}

contract EducationData is StorageStringBasic {

  address private owner_;
  
  mapping(string => Degree) degrees_;
  mapping(string => bool) degreesExist_;
  // Degree => Students
  mapping(string => address[]) degree2Students;
  // Student => Degrees
  mapping(address => string[]) student2Degrees;

  mapping(string => Institution) institutions_;
  mapping(string => bool) institutionsExist_;
  string[] institutionsIds_;
        // institution ID signers addresis  
  mapping(string => address[]) InstitutionSigners_;

    // Instituccion => Grados
  mapping(string => string[]) institution2Degrees;

  mapping(string => Title) titles_;
  mapping(string => bool) titlesExist_;
  string[] titlesIds_;
  mapping(address => string[]) student2Titles_;
  mapping(string => string[]) inst2titles_;


  bool modifierActive;


  constructor() public {
    owner_ = msg.sender;
    modifierActive = true;
  }

  modifier isStudentInDegree(string memory degreeID, address studentID)
  {
    if(modifierActive)
    {
      require(degreesExist_[degreeID], "The degree does not exist");
      
      bool result = false;
      string[] memory degrees = student2Degrees[studentID];
      for(uint256 i = 0; i < degrees.length; i++)
      {
        if(keccak256(abi.encodePacked(degrees[i])) == keccak256(abi.encodePacked(degreeID)))
          result = true;
      }

      require(result, "The student is not in the degree");
    }
    _;
  }

  modifier notStudentInDegree(string memory degreeID, address studentID)
  {
    if(modifierActive)
    {
      require(degreesExist_[degreeID], "The degree does not exist");

            
      bool result = false;
      string[] memory degrees = student2Degrees[studentID];
      for(uint256 i = 0; i < degrees.length; i++)
      {
        if(keccak256(abi.encodePacked(degrees[i])) == keccak256(abi.encodePacked(degreeID)))
          result = true;
      }
      require(!result, "The student is in the degree");
    }
    _;
  }

  modifier isDegreeInInstitution(string memory degreeID, string memory institutionID)
  {
    if(modifierActive)
    {
      require(institutionsExist_[institutionID], "The institution does not exist");

      bool result = false;
      string[] memory degrees = institution2Degrees[institutionID];
      for (uint256 index = 0; index < degrees.length; index++)
      {
        if(equals(degrees[index], degreeID))
          result =  true;
      }

      require(result, "The degree is not available in this institution");
    }
    _;
  }

    // Degrees

  function addDegree(string memory id, string memory name) external {
    degrees_[id] = Degree(id, name);
    degreesExist_[id] = true;
  }

  function getDegree(string memory id) external view returns (Degree memory) {
    return degrees_[id];
  }
  // DegreesStudents

  function addStudent(address studentID, string memory degreeID, string memory institutionID) external notStudentInDegree(degreeID, studentID) isDegreeInInstitution(degreeID, institutionID) {
    degree2Students[degreeID].push(studentID);
    student2Degrees[studentID].push(degreeID);
  }

  function getDegreesByStudent(address studentID) external view returns (string[] memory) {
    return student2Degrees[studentID];
  }

  function getStudentsByDegree(string memory degreeID) external view returns (address[] memory) {
    return degree2Students[degreeID];
  }

  // Institutions

  function isDirector(address signer, string memory institutionID) external view returns (bool)
  {
    address[] memory signers = InstitutionSigners_[institutionID];

    for(uint256 index = 0; index < signers.length; index++)
    {
        if(signers[index] == signer)
        return true;
    }

    return false;
  }

  function addInstitution(string memory id, string memory name, address director) external {
    institutions_[id] = Institution(id, name);
    InstitutionSigners_[id].push(owner_);
    InstitutionSigners_[id].push(director);
    institutionsExist_[id] = true;
    institutionsIds_.push(id);
  }

  function getInstitution(string memory id) external view returns (Institution memory) {
    return institutions_[id];
  }

  function getInstitutions() external view returns (string[] memory) {
    return institutionsIds_;
  }

  // InstitutionsDegrees

function addDegreeInInstitution(string memory institutionID, string memory degreeID) external {
  institution2Degrees[institutionID].push(degreeID);
}

function getDegreesByInstitution(string memory institutionID) external view returns (string[] memory) {
  return institution2Degrees[institutionID];
}

  //Titles
function emitTitle(string memory id, string memory institution, string memory degree, address student, uint16 year) external notExist(id) isDegreeInInstitution(degree, institution) isStudentInDegree(degree, student) {
  titles_[id] = Title(id, institution, degree, student, year, eTitleStatus.ACTIVE);
  student2Titles_[student].push(id);
  inst2titles_[institution].push(id);
  titlesExist_[id] = true;
}

function getTitle(string memory id) external view returns (Title memory) {
  return titles_[id];
}

function getTitles() external view returns (string[] memory) {
  return titlesIds_;
}

function getTitlesByStudent(address id) external view returns (string[] memory) {
  return student2Titles_[id];
}

function getTitlesByInstitution(string memory id) external view returns (string[] memory) {
  return inst2titles_[id];
}

function cancelTitle(string memory id) external {
  Title storage title = titles_[id];
  title.state_ = eTitleStatus.INACTIVE;
}

}