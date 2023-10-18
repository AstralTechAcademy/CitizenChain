pragma solidity >=0.6.0 <0.8.0;
// Contract address already deployed: 0xA4cD3b0Eb6E5Ab5d8CE4065BcCD70040ADAB1F00

contract AccessControl {

    mapping(address => bool) academicInstitution;
    mapping(address => bool) civilRegistry;
    mapping(uint => address) academicIndexes;
    mapping(uint => address) civilRegistryIndexes;
    uint academicIndex = 0;
    uint civilRegistryIndex = 0;
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

    function isCivilRegistry(address add) public returns (bool)
    {
        if(!civilRegistry[add])
            return false;
        return civilRegistry[add];
    }

    function addAcademicInstitution (address addr) public onlyOwner
    {
        academicInstitution[addr] = true;
        academicIndexes[academicIndex] = addr;
        academicIndex = academicIndex + 1;
    }

    function addCivilRegistryInstitution (address addr) public onlyOwner
    {
        civilRegistry[addr] = true;
        civilRegistryIndexes[civilRegistryIndex] = addr;
        civilRegistryIndex = civilRegistryIndex + 1;
    }

    function getInstitution(uint index) external view returns (address) {
        return academicIndexes[academicIndex];
    }


    function getCivilRegistry(uint index) external view returns (address) {
        return civilRegistryIndexes[civilRegistryIndex];
    }

}