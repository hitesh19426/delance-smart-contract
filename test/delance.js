const Delance = artifacts.require("Delance");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Delance", function (/* accounts */) {
  it("should assert true", async function () {
    await Delance.deployed();
    return assert.isTrue(true);
  });
});
