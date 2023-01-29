//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Caller {

  address contractAddress = 0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502;
  
  constructor (){
    (bool s, ) = contractAddress.call(
      abi.encodeWithSignature("attempt()")
    );
    require(s);
  }
}