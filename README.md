# About

This is a freelancing smart contract app which connects employer and freelancer. The contract allows employer to create a contract with a employer and create requests.

[Project Source Link](https://bitnician.medium.com/solidity-smart-contract-tutorial-with-building-full-stack-dapp-part-1-introduction-65988e83b4a3)

**Note:** *There is a small functionality difference between original code and my code. Article author has used price local variable to store the transaction balance, but it does not decrease automatically when freelancer decrease the money. In my case, I have used smart contract balance to store employer money, it is say more feasible and intuitive since you want to store money in smart contract. It helps in separating employer account from contract account, and throws error if employer tries to deduct from than available from contract.*

---

## Dependecy

1. Solidity compiler (latest)
2. Ganache

---

## How to use

1. Clone the repo to a local folder.
2. Open the repo folder
3. Open console/terminal
4. run: `truffle compile` to compile the contracts
5. Run ganache
6. Open `migrations/2_deploy_contracts.js` file
7. Copy one of the account address from ganache accounts list. This address will be the address of the freelancer and account[0] will be the address of employer. You can also use other address if you want for employer/freelancer address.

8. Paste the copied/freelancer address in place of address in `migrations/2_deploy_contracts.js`.

9. run: `truffle test`
10. run: `truffle migrate --reset`

Your contract is deployed to local ganache blockchain.

---

## How to interect with contract variables

- run: `truffle console` in terminal
- Use `let contract = await Delance.deployed()` to get contract instance
- Use `contract.employer()` to get value of employer
  - You can also get other values similarly. Just use the name of the variable instead of employer.
  - **Note:** You can only get public values this way. Use getters for other values.
- You can also use `let employer = await contract.employer()` to store employer address in 'employer' variable and then run `employer` to access it.
- To get the balance of smart contract, use `web3.eth.getBalance(contract.address)`
- To get list of accounts, use `web3.eth.getAccounts()`
- To send money to smart contract, use `contract.send(web3.utils.toWei("10", "ether"));`
- To call createRequest function, use `contract.createRequest('request name', web3.utils.toWei('1', 'ether'), {from: accounts[1]})`
  - Second argument of above function is used to send ethereum to smart contract. the default unit of transfer is wei. we are sending 1 eth above by using web3 library to convert 1 eth to wei.
  - Replace the address in from field with freelancer address. Without it, you will not be able to call the function since its freelancer only.

## To-Do

1. Write tests for the smart contract.
2. Push them in a new branch.
3. Optional: Add error msgs in assert statements in test file.

## Update

1. Coded the test file with tests for all contract functions.
2. Created new testDone branch and pushed the updates code in it.