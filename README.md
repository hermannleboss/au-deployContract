# Deploy a Contract with Ethers.js + Hardhat : Goerli Faucet

In this activity, we'll run through deploying a contract to the Göerli test network. We will deploy a live ether faucet on Göerli - you can choose to deploy any contract you'd like or customize the one below however you like! 🚰

It's great to get some practice in with leading web3 development like Hardhat, let's jump in! 👨‍🔧👩‍🔧

## TODO 
--- 
Create some sort of way of keeping track of user addresses that have already used it? Or using timestamps to limit mass withdrawals all at once?

## Setup 

```shell
cp .env.local .env
```

Define PRIVATE_KEY & GOERLI_URL

## Try running some of the following tasks :

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli
```

