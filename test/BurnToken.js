const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GBRBurnToken", function () {
  let gbrToken, gbrBurnToken, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    // Deploy GBRToken mock
    const GBRTokenMock = await ethers.getContractFactory("ERC20Mock");
    gbrToken = await GBRTokenMock.deploy("GBR Token", "GBR", owner.address, ethers.utils.parseEther("1000000000000"));

    // Deploy gbrBurnToken
    gbrBurnToken = await ethers.getContractFactory("GBRBurnToken");
    gbrBurnToken = await gbrBurnToken.deploy(gbrToken.address);
  });

  it("Should successfully burn GBR tokens", async function () {
    // Burn GBR tokens
    await gbrToken.connect(owner).approve(gbrBurnToken.address, ethers.utils.parseEther("10"));
    await gbrBurnToken.connect(owner).burn(ethers.utils.parseEther("10"));

    // Check GBR balance
    expect(await gbrBurnToken.burnedTokens()).to.equal(ethers.utils.parseEther("10"));
  });
});
