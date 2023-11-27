


contract StorageStringBasic
{
    mapping(string => bool) private exist_;
    uint private count_;
    string[] ids_;

    modifier notExist(string memory id)
    {
        require(exist_[id] == false, "The id exist");
        _;
    }

    modifier exist(string memory id)
    {
        require(exist_[id], "The id does not exist");
        _;
    }
    
    function add(string memory id) public
    {
        exist_[id] = true;
        ids_.push(id);
        count_++;
    }

    function count() external view returns (uint) {
        return count_;
    } 

    function exist2(string memory id) public view returns (bool) {
        return exist_[id];
    } 

    function equals(string memory str1, string memory str2) public view returns (bool)
    {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
}