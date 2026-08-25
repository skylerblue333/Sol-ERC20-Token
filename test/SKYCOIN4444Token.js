const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SKYCOIN4444Token", function () {
  async function deployToken(amount = "4444") {
    const [deployer, recipient, spender] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("SKYCOIN4444Token");
    const supply = ethers.parseUnits(amount, 18);
    const token = await Token.deploy(supply);
    await token.waitForDeployment();
    return { token, supply, deployer, recipient, spender };
  }

  it("mints exactly the configured initial supply to the deployer", async function () {
    const { token, supply, deployer } = await deployToken();

    expect(await token.name()).to.equal("SKYCOIN4444");
    expect(await token.symbol()).to.equal("SKY4");
    expect(await token.decimals()).to.equal(18);
    expect(await token.totalSupply()).to.equal(supply);
    expect(await token.balanceOf(deployer.address)).to.equal(supply);
    expect(await token.initialSupply()).to.equal(supply);
  });

  it("supports standard ERC-20 transfers", async function () {
    const { token, deployer, recipient } = await deployToken("100");
    const amount = ethers.parseUnits("10", 18);

    await expect(token.transfer(recipient.address, amount))
      .to.emit(token, "Transfer")
      .withArgs(deployer.address, recipient.address, amount);

    expect(await token.balanceOf(recipient.address)).to.equal(amount);
  });

  it("supports allowance and transferFrom semantics", async function () {
    const { token, deployer, recipient, spender } = await deployToken("100");
    const amount = ethers.parseUnits("12", 18);

    await expect(token.approve(spender.address, amount))
      .to.emit(token, "Approval")
      .withArgs(deployer.address, spender.address, amount);

    await token.connect(spender).transferFrom(deployer.address, recipient.address, amount);
    expect(await token.balanceOf(recipient.address)).to.equal(amount);
    expect(await token.allowance(deployer.address, spender.address)).to.equal(0);
  });

  it("rejects transfers that exceed the sender balance", async function () {
    const { token, recipient } = await deployToken("1");
    const amount = ethers.parseUnits("2", 18);

    await expect(token.transfer(recipient.address, amount)).to.be.revertedWithCustomError(
      token,
      "ERC20InsufficientBalance",
    );
  });
});
