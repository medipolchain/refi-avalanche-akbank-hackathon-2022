// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./NTT.sol";

contract SIS is NTT {
    constructor() NTT("SISToken", "SIS") {}
}
