import { ethers } from "hardhat";

async function main() {
  const LegendaryCars = await ethers.getContractFactory("LegendaryCars");
  const legendaryCars = await LegendaryCars.deploy();

  await legendaryCars.deployed();

  console.log("LegendaryCars deployed to:", legendaryCars.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
