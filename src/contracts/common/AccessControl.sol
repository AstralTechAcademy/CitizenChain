pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

enum eRole
{
    NONE,
    VIEWER,
    WRITER,
    ADMIN
}

struct tRole
{
    string name_;
    bool active_;
    bool created_;
}

contract AccessControl {

    address private owner_;
    uint private count_;
            // user addr
    mapping(string => mapping(address => bool)) private users_;
    mapping(string => tRole) private roles_;
    
    constructor()
    {
        owner_ = msg.sender;
    }

    modifier isOwner()
    {
        require(owner_ == msg.sender, "[AccessControl::isOwner] The sender is not the owner");
        _;
    }

    function changeOwner(address id) external isOwner()
    {
        owner_ = id;
    }

    event assigned(uint indexed timestamp, address id);

    function createRole(string memory name) external isOwner()
    {
        require(roles_[name].created_ == false);
        roles_[name] = tRole(name, true, true);
        count_++;
    }

    function get(string memory name) external view returns (tRole memory)
    {
        require(roles_[name].created_ == true, "The role does not exist");
        return roles_[name];
    }

    function assign(string memory role, address id) external isOwner()
    {
        require(roles_[role].created_ == true, string(abi.encodePacked("The role " , role, " does not exist")));
        require(users_[role][id] == false, string(abi.encodePacked("The user " , id, " already assigned in role ", role)));
        users_[role][id] = true;
        emit assigned(block.timestamp, id);
    }

    function count() external view returns (uint)
    {
        return count_;
    }

    function has(string memory role, address id) external view returns (bool)
    {
        require(roles_[role].created_ == true, "[AccessControl::has] The role does not exist");
        require(roles_[role].active_ == true, "[AccessControl::has] The role is inactive");
        return users_[role][id];
    }
}