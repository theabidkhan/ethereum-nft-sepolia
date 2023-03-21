const MyNFT = artifacts.require("MyNFT");

module.exports = async function (deployer) {
  await deployer.deploy(MyNFT);
  const myNFT = await MyNFT.deployed();
  console.log('----------------------- *** ------------------------');
  console.log("Contract deployed to address:", myNFT.address)
  console.log('----------------------- *** ------------------------');
};
