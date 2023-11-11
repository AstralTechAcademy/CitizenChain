


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
}