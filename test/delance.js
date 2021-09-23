const Delance = artifacts.require("Delance");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Delance", async function(accounts) {
  it("checking initialization of contract", async function() {
    const contract = await Delance.deployed();
    const freelancer = await contract.freelancer();
    const employer = await contract.employer();
    assert.notEqual(freelancer, employer);
  });

  it('checking recieving function', async function() {
    const contract = await Delance.new(accounts[1], 1234);
    const amountToSend = 100;
    const contractBalanceString = await web3.eth.getBalance(contract.address); //y1

    await contract.send(100, {from:accounts[1]});

    const accountBalanceString2 = await web3.eth.getBalance(accounts[1]);  //x2
    // cannot say x2 = x1-100, since gas bhi toh kharach hogi
    const contractBalanceString2 = await web3.eth.getBalance(contract.address); //y2

    const y1 = new Number(contractBalanceString);
    const y2 = new Number(contractBalanceString2);

    assert.equal(y2, y1+amountToSend);
  });

  it("checking createRequest function", async function () {
    const contract = await Delance.new(accounts[1], 1234);
    const requestName = 'test request';
    const amountToSend = 100;

    await contract.createRequest(requestName, amountToSend, {from:accounts[1]});
    const request = await contract.requests(0);

    assert.equal(request.title, requestName);
    assert.equal(request.amount, amountToSend);
    assert.equal(request.locked, true);
    assert.equal(request.paid, false);
  })

  it('unlockRequest funciton', async function() {
    const contract = await Delance.new(accounts[1], 1234);
    const requestName = 'test request';
    const amountToSend = 100;

    await contract.createRequest(requestName, amountToSend, {from:accounts[1]})
    await contract.unlockRequest(0);
    const request = await contract.requests(0);
    
    assert.equal(request.locked, false);
  })

  it('withdraw function', async function() {
    const contract = await Delance.new(accounts[1], 1234, {value:web3.utils.toWei("1", "ether")});
    const requestName = 'test request';
    const amountToSend = 100;

    await contract.createRequest(requestName, amountToSend, {from:accounts[1]});
    await contract.unlockRequest(0);
    let request = await contract.requests(0);

    assert.equal(request.locked, false);
    assert.equal(request.paid, false);

    const initialBalance = await web3.eth.getBalance(contract.address);
    const x1 = Number(initialBalance);

    await contract.withdraw(0, {from: accounts[1]});

    const finalBalance = await web3.eth.getBalance(contract.address);
    const x2 = Number(finalBalance);

    request = await contract.requests(0);
    assert(request.paid);
    assert(request.locked==false);
    assert.equal(x1-request.amount, x2);
  });

});
