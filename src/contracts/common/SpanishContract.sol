
pragma solidity >=0.6.0 <0.8.0;

import "./AccessControl.sol";

contract SpanishContract {

    AccessControl ac = AccessControl(0xa1E47689f396fED7d18D797d9D31D727d2c0d483);

    function updateContractAddress() public
    {
        ac = AccessControl(0xa1E47689f396fED7d18D797d9D31D727d2c0d483);
    }

}