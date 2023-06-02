// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.9;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract GBRBurnToken {
    
    address public owner;
    IERC20 public gbrToken;
    uint256 public burnedTokens;

    event Burn(address indexed user, uint256 amount);

    constructor(address _gbrTokenAddress) {
        owner = msg.sender;
        gbrToken = IERC20(_gbrTokenAddress);
    }

    function burn(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        require(gbrToken.balanceOf(msg.sender) >= _amount, "Insufficient balance of GBR on your wallet");

        require(gbrToken.transferFrom(msg.sender, address(this), _amount), "Failed to burn GBR tokens to contract");
        burnedTokens += _amount;

        emit Burn(msg.sender, _amount);
    }
}