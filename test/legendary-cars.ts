import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { LegendaryCars } from "../typechain";

describe("LegendaryCars", function () {
  let legendaryCars: LegendaryCars;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();
    const LegendaryCars = await ethers.getContractFactory("LegendaryCars");
    legendaryCars = await LegendaryCars.deploy();
    await legendaryCars.deployed();
  });

  it("Should create contract correctly", async function () {
    expect(await legendaryCars.owner()).to.equal(owner.address);
  });

  it("Should mint nft", async function () {
    const user1Address = user1.address;
    const mintTx = await legendaryCars.mint(user1Address, "testURI");
    await mintTx.wait();
    
    expect(Number(await legendaryCars.balanceOf(user1Address))).to.equal(1);
    expect(await legendaryCars.tokenURI(1)).to.equal("ipfs://testURI");
  });

  it("Should burn nft", async function () {
    const user1Address = user1.address;
    const mintTx = await legendaryCars.mint(user1Address, "testURI");
    await mintTx.wait();
    const burnTx = await legendaryCars.burn(1);
    await burnTx.wait();

    expect(Number(await legendaryCars.balanceOf(user1Address))).to.equal(0);
  });

  it("Should emit event", async function () {
    const user1Address = user1.address;
    await expect(legendaryCars.mint(user1Address, "testURI")).to.emit(legendaryCars, "Transfer")
    .withArgs("0x0000000000000000000000000000000000000000", user1Address, 1);
  });

  it("Should return baseURI", async function () {
    expect(await legendaryCars.baseTokenURI()).to.equal("ipfs://");
  });
});
