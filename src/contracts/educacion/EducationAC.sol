pragma solidity >=0.6.0 <0.8.0;

contract EducationAC {

    mapping(address => bool) academicInstitution;
    mapping(uint => address) academicIndexes;
    uint academicIndex = 0;
    address mOwner;

    constructor() public {
        mOwner = msg.sender;
    }

    modifier onlyOwner()
    {
        require(mOwner == msg.sender,
            "Caller is not the owner of AccessControl contract"
        );
        _;
    }

    modifier isAcademicInstitution (address add)
    {
        require(academicInstitution[add]);
        _;
    }

    function isAcademicInstitution1 (address add) public returns (bool)
    {
        if(!academicInstitution[add])
            return false;
        return academicInstitution[add];
    }

    function addAcademicInstitution (address addr) public onlyOwner
    {
        academicInstitution[addr] = true;
        academicIndexes[academicIndex] = addr;
        academicIndex = academicIndex + 1;
    }
}