const NationalMonumentNFT = artifacts.require("NationalMonumentNFT");

module.exports = function (deployer) {
  deployer.deploy(NationalMonumentNFT);
};