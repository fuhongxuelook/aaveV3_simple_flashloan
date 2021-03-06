// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import { FlashLoanSimpleReceiverBase } from './flashloan-lib/FlashLoanSimpleReceiverBase.sol';
import { IPoolAddressesProvider } from './flashloan-lib/IPoolAddressesProvider.sol';

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract V3FlashLoan is FlashLoanSimpleReceiverBase, Ownable {
    constructor(IPoolAddressesProvider _address) FlashLoanSimpleReceiverBase(_address){}

    function executeOperation(
        address asset, 
        uint256 amount, 
        uint256 premium, 
        address initiator, 
        bytes calldata params
    )
        external
        override
        returns (bool)
    {
        uint256 debt = amount + premium;
        IERC20(asset).approve(address(POOL), debt);
        return true;
    } 

    function startFlashLoan(address asset) public onlyOwner {
        address receiver = address(this);

        uint256 amount = 1 * 10**18;

        bytes memory params = "";

        uint16 referralCode = 0;

        POOL.flashLoanSimple(
            receiver,
            asset,
            amount,
            params,
            referralCode
        );
    }

}