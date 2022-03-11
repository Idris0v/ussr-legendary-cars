import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { GameItems } from "../typechain";

describe("GameItems", function () {
  let gameItems: GameItems;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;

  beforeEach(async () => {
    [owner, user1] = await ethers.getSigners();
    const GameItems = await ethers.getContractFactory("GameItems");
    gameItems = await GameItems.deploy("QmdSDSQLfYtXRGywdD71gMCfpXoAdukuBMZW6mn37CjkCK");
    await gameItems.deployed();
  });

  it("Should create contract correctly", async function () {
    expect(await gameItems.owner()).to.equal(owner.address);
  });

  it("Should mint nft", async function () {
    const user1Address = user1.address;
    const mintTx = await gameItems.mint(user1Address, 0, 1);
    await mintTx.wait();
    
    expect(Number(await gameItems.balanceOf(user1Address, 0))).to.equal(1);
  });

  it("Should emit event", async function () {
    const user1Address = user1.address;
    await expect(gameItems.mint(user1Address, 0, 1)).to.emit(gameItems, "TransferSingle")
    .withArgs(owner.address, "0x0000000000000000000000000000000000000000", user1Address, 0, 1);
  });

  it("Should burn nft", async function () {
    const user1Address = user1.address;
    const mintTx = await gameItems.mint(user1Address, 0, 1);
    await mintTx.wait();
    const burnTx = await gameItems.burn(user1Address, 0, 1);
    await burnTx.wait();
    
    expect(Number(await gameItems.balanceOf(user1Address, 0))).to.equal(0);
  });
});
