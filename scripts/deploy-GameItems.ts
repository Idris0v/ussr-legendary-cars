import { ethers } from "hardhat";

async function main() {
  if (!process.env.GAME_ITEMS_CID) {
    throw new Error('process.env.GAME_ITEMS_CID is not provided');
  }
  const GameItems = await ethers.getContractFactory("GameItems");
  const gameItems = await GameItems.deploy(process.env.GAME_ITEMS_CID);

  await gameItems.deployed();

  console.log("GameItems deployed to:", gameItems.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
