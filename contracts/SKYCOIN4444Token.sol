// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title SKYCOIN4444 Token
/// @notice Minimal ERC-20 foundation using OpenZeppelin's maintained implementation.
/// @dev Supply policy is explicit: initial supply is minted to the deployer and
/// there is no public mint function.
contract SKYCOIN4444Token is ERC20 {
    uint256 public immutable initialSupply;

    constructor(uint256 supply) ERC20("SKYCOIN4444", "SKY4") {
        initialSupply = supply;
        _mint(msg.sender, supply);
    }
}
