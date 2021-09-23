const Delance = artifacts.require("Delance");

module.exports = function (deployer) {
  deployer.deploy(Delance, "0xB28eF1Ad32f84184B5940FB9977Ad91F64c2045C", 123456789, {value:web3.utils.toWei("10", "ether")});
};
