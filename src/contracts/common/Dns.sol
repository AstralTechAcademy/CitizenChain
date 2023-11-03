pragma solidity >=0.6.0 <0.8.0;

contract Dns {

    mapping(string => address) records;
    mapping(string => bool) exist_;
    uint count_;


    modifier notExist(string memory name)
    {
        require(exist_[name] == false, "Contract already added in DNS");
        _;
    }

    modifier exist(string memory name)
    {
        require(exist_[name] == true, "Contract not added in DNS");
        _;
    }

    function getAddress(string memory name) public exist(name) returns(address)
    {
        return records[name];
    }

    function addRegistry(string memory name, address id) external notExist(name)
    {
        records[name] = id;
        exist_[name] = true;
        count_++;
    }

    function updateRegistry(string memory name, address id) external exist(name)
    {
        records[name] = id;
    }

    function count() external view returns (uint) {
        return count_;
    } 

}