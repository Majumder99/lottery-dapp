// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
  address public manager;
    address payable[] public participants;

    constructor(){
        //give authority to managerf
        //creates the manager
        manager = msg.sender;
    }

    //if anyone transact ether he/she will automatically added in participant list
    receive() external payable{
        require(msg.value == 1 ether); 
        participants.push(payable(msg.sender));
    }

    function getBalance() public view returns(uint){
        require(msg.sender == manager );
        return address(this).balance;
    }
    function random() public view returns(uint){
        //generates random number
        //you can encode with one string also
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants.length)));
    }
    function setWinner() public {
        require(msg.sender == manager);
        require(participants.length >= 3);
        uint r = random();
        address payable winner;
        uint index = r % participants.length;
        winner = participants[index];
        winner.transfer(getBalance());
        // reset the participants list
        // now the participants will be zero
        participants = new address payable[](0);
    }
}
