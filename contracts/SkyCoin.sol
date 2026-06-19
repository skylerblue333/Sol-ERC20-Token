// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SkyCoin is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18;
    uint256 public constant MINT_PRICE = 0.001 ether;
    
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    constructor() ERC20("SkyCoin", "SKY") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000 * 10**18); // Initial supply
    }

    function mint(address to, uint256 amount) external payable {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        require(msg.value >= (amount / 10**18) * MINT_PRICE, "Insufficient ETH");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }

    function withdraw() external onlyOwner {
        (bool sent, ) = owner().call{value: address(this).balance}("");
        require(sent, "Withdraw failed");
    }
}
