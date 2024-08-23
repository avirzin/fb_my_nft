const hre = require("hardhat");

async function main() {
  const factory = await hre.ethers.getContractFactory("MyNFT");
  const contract = await factory.deploy();
  const receipt = await contract.waitForDeployment()

  console.log("Contract deployed to:", await receipt.getAddress());
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
