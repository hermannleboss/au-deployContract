const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
require('dotenv').config();


describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory('Faucet');
    const deployAmount = ethers.utils.parseEther("1");
    const faucet = await Faucet.deploy({value: deployAmount});
    let withdrawAmount = ethers.utils.parseUnits("1", "ether");

    const url = process.env.GOERLI_URL;

    const provider = new ethers.providers.JsonRpcProvider(url);

    const [owner, signer2] = await ethers.getSigners();

    console.log(" faucet.balance",faucet.accountsBalance)
    console.log('Signer 1 address: ', owner.address);
    return { faucet, owner,signer2, withdrawAmount, provider };
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should not allow withdrawals above .1 Eth At a time', async function () {
    const { faucet , withdrawAmount} = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.withdraw(withdrawAmount)).to.be.revertedWith("Maximum Amount is .1 ETH");
  });

  it('should sent the ether', async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.withdraw(1000000000000000)).not.to.be.reverted;
  });

  it('should allow withdraw to every user', async function () {
    const { signer2, faucet } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.connect(signer2).withdraw(1000)).not.to.be.reverted;
  });

  it('should not allow a signer != onwer to withdrawAll', async function () {
    const { owner, signer2, faucet } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.connect(signer2).withdrawAll()).to.be.revertedWith("Only the owner is allowed");
    await expect(faucet.connect(owner).withdrawAll()).not.to.be.reverted;
  });

  it('should not allow a signer != onwer to destroyFaucet', async function () {
    const { owner, signer2, faucet, provider } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.connect(signer2).destroyFaucet()).to.be.revertedWith("Only the owner is allowed");
    await expect(faucet.connect(owner).destroyFaucet()).not.to.be.reverted;
    await expect(await provider.getCode(faucet.address)).to.equal("0x")
  });

  //should allow withdraw to every user
});