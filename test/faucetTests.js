const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy();
    let withdrawAmountHight = ethers.utils.parseUnits("1000", "ether");

    let withdrawAmount = ethers.utils.parseUnits("0.1", "ether");

    const [owner] = await ethers.getSigners();

    console.log('Signer 1 address: ', owner.address);
    return { faucet, owner, withdrawAmount , withdrawAmountHight};
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should not allow withdrawals above .1 Eth At a time', async function () {
    const { faucet, withdrawAmountHight } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.withdraw(withdrawAmountHight)).to.be.revertedWith("Maximum Amount is .1 ETH");
  });

  it('should not sent the ether', async function () {
    const { faucet, withdrawAmount } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.withdraw(withdrawAmount)).to.be.revertedWith("Failed to send Ether");
  });
});