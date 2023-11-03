


contract StorageUintBasic
{
    mapping(uint => bool) private exist_;
    uint private count_;

    modifier notExist(uint id)
    {
        require(exist_[id] == false, "The id exist");
        _;
    }

    modifier exist(uint id)
    {
        require(exist_[id], "The id does not exist");
        _;
    }
    
    function add(uint id) public
    {
        exist_[id] = true;
        count_++;
    }

    function count() external view returns (uint) {
        return count_;
    } 
}