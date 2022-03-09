//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LegendaryCars is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("LegendaryCars", "LGDC") {
    }

    function mint(address to, string memory imageCID) external onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, imageCID);

        return newItemId;
    }

    function burn(uint tokenId) external onlyOwner {
        _burn(tokenId);
    }

    function baseTokenURI() public pure returns (string memory) {
        return _baseURI();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }
}
