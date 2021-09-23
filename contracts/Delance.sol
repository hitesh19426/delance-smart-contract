// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// allows to pass arrays, structs, dynamic and nested variables to function and return same from functions
pragma experimental ABIEncoderV2;

contract Delance {
  // properties of freelancer-employee contract
  address payable public employer;
  address payable public freelancer;
  uint public deadline; // time in solidity is measured using epoch seconds
  uint public price;

  constructor (address payable _address, uint _deadline) payable {
    employer = payable(msg.sender);
    freelancer = _address;
    deadline = _deadline;
  }

  // this function is used if anyone wants to send ether to the contract.
  // It could be employer, freelancer, or even you, or me :)
  receive() external payable {}

  // implementing the freelencer sending request part of the contract.
  // struct to store payment request of freelancer.
  struct Request {
    string title;
    uint256 amount; // why uint256??
    bool locked;  // initialially request will be locked, employer will unlock it and transfer required ehther.
    bool paid;
  }

  // creating a modifier - function restrictor so only freelancer call call certain functions
  // it is useful if you do not want to repeat require statement again and again.
  modifier onlyFreelancer() {
    require(msg.sender == freelancer, 'only freelancer');
    _;
  }
  event RequestCreated(string _title, uint256 _amount, bool locked, bool paid);

  Request[] public requests;
  function createRequest(string memory _title, uint256 _amount) public onlyFreelancer {
    requests.push(Request(_title, _amount, true, false));
    emit RequestCreated(_title, _amount, true, false);
  }
  function getAllRequest() public view returns(Request[] memory) {
    return requests;
  }

  modifier onlyEmployer(){
    require(msg.sender == employer, 'only employer');
    _;
  }

  // event is same as javascript console.log() function.
  // It prints the event to the console. Later, you can listen
  // to these events and use these in UI. Here, you can listen whenever
  // a request is unlocked and update UI accordingly.
  event RequestUnlocked(bool locked);

  function unlockRequest(uint index) public onlyEmployer {
    // storage keyboard makes var "request" behaves as a pointer
    Request storage request = requests[index];
    require(request.locked == true, 'already unlocked');
    request.locked = false;

    emit RequestUnlocked(request.locked);
  }

  // sending money to the freelancer for the request
  // who is paying here ?? employer, contract or price
  bool locked = false;
  event RequestPaid(address payable freelancer, uint amount);
  
  function withdraw(uint _index) public onlyFreelancer {
    require(locked == false, 'contract locked/reentrant call');
    
    Request storage request = requests[_index];
    require(request.locked == false, 'unlock request first');
    require(request.paid == false, 'already paid');

    locked = true;
    (bool success, ) = freelancer.call{value: request.amount}('');
    
    require(success, 'Transfer failed');
    request.paid = true;
    locked = false;
    emit RequestPaid(payable(msg.sender), request.amount);
  }

}
