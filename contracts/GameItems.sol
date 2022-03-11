//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameItems is ERC1155, Ownable {
    enum Items {
        Gold,
        Silver,
        FirstAidKit
    }

    constructor(string memory itemsCID) ERC1155(string(abi.encodePacked("ipfs://", itemsCID, "/{id}.json"))) {
    }

    function mint(address to, Items id, uint amount) external onlyOwner {
        _mint(to, uint(id), amount, "");
    }

    function burn(address from, Items id, uint256 amount) external {
        _burn(from, uint(id), amount);
    }
}