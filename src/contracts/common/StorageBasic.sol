


contract StorageBasic
{
    mapping(address => bool) private exist_;
    uint private count_;

    modifier notExist(address id)
    {
        require(exist_[id] == false, "The address exist");
        _;
    }

    modifier exist(address id)
    {
        require(exist_[id], "The address does not exist");
        _;
    }
    
    function add(address id) public
    {
        exist_[id] = true;
        count_++;
    }

    function count() external view returns (uint) {
        return count_;
    } 

    function size() public view returns (uint) {
        return count_;
    } 
}