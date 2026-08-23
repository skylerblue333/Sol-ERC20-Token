const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SKYCOIN4444Token", function () {
  it("mints the configured initial supply to the deployer", async function () {
    const [deployer] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("SKYCOIN4444Token");
    const supply = ethers.parseUnits("4444", 18);
    const token = await Token.deploy(supply);
    await token.waitForDeployment();

    expect(await token.name()).to.equal("SKYCOIN4444");
    expect(await token.symbol()).to.equal("SKY4");
    expect(await token.totalSupply()).to.equal(supply);
    expect(await token.balanceOf(deployer.address)).to.equal(supply);
    expect(await token.initialSupply()).to.equal(supply);
  });

  it("supports standard ERC-20 transfers", async function () {
    const [deployer, recipient] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("SKYCOIN4444Token");
    const token = await Token.deploy(ethers.parseUnits("100", 18));
    await token.waitForDeployment();

    await expect(token.transfer(recipient.address, ethers.parseUnits("10", 18)))
      .to.emit(token, "Transfer")
      .withArgs(deployer.address, recipient.address, ethers.parseUnits("10", 18));

    expect(await token.balanceOf(recipient.address)).to.equal(ethers.parseUnits("10", 18));
  });
});
