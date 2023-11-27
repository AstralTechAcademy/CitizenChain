// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Educa is ERC721 {
    uint256 private _nextTokenId;

    constructor()
        ERC721("Educa", "EDU")
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://jade-negative-emu-951.mypinata.cloud/ipfs/QmWoW7Rw5CEn8FjYdz5pzhQ3HPUUKVxvN1mYMF69L4yas8/";
    }

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }
}
