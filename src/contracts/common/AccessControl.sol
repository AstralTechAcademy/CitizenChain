pragma solidity >=0.6.0 <0.8.0;
// Contract address already deployed: 0xA4cD3b0Eb6E5Ab5d8CE4065BcCD70040ADAB1F00

contract AccessControl {

    mapping(address => bool) academicInstitution;
    mapping(uint => address) indexes;
    uint index = 0;
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
        indexes[index] = addr;
        index = index + 1;
    }

    function getInstitution(uint index) external view returns (address) {
        return indexes[index];
    }

}