pragma solidity >=0.6.0 <0.8.0;

contract SpanishDNS {

    mapping(string => address) records;

    function getAddress(string memory name) public returns(address)
    {
        return records[name];
    }

}