const Delance = artifacts.require("Delance");

module.exports = function (deployer) {
  deployer.deploy(Delance, "0xb067ad093feA0414b01802964AfBF824973be9e2", 12000000, {value:web3.utils.toWei("10", "ether")});
};
