import { task } from "hardhat/config"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumber } from "ethers"
import "@nomiclabs/hardhat-waffle"

// When using the hardhat network, you may choose to fork Fuji or Avalanche Mainnet
// This will allow you to debug contracts using the hardhat network while keeping the current network state
// To enable forking, turn one of these booleans on, and then run your tasks/scripts using ``--network hardhat``
// For more information go to the hardhat guide
// https://hardhat.org/hardhat-network/
// https://hardhat.org/guides/mainnet-forking.html
const FORK_FUJI = false
const FORK_MAINNET = false
const forkingData = FORK_FUJI ? {
  url: 'https://api.avax-test.network/ext/bc/C/rpc',
} : FORK_MAINNET ? {
  url: 'https://api.avax.network/ext/bc/C/rpc'
} : undefined

export const testAccounts = [
  "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027", //SPAIN
  "0x61779b3f52f56378133a2c98a7142b34cae9312efd9283be62d9e84805ae59ea", //Ciudadano 1
  "0x73425173342a1124e99ca23a9ef57641f95d074a9d1fe63964839564f9d3f294", //UPM
  "0x74ec9b3f18c6d42703eaa339b9abf89e1a6006a9a42d75e2b27e31d620ccc598", // UOC
  "0x3eac583523be91059dc06d76af625b28e9e0da76c99ea4b364b41d4700f042ba", //UAM

  "0x6fd251d186c51caf8f9a70033e45149cce7ad0a24c41b2f4b2f5554ba71d75c5", //Teleco
  "0x4ef5417edc71502a3b9bafe3d55f7a4331e471d4bcf4bf39d1e9b63f77802b17", //Computer science
  "0xd26470431709d34e25820e45e3c679edbc9e642484347674aa3c78a004e6a4d9", //Aerospacial
  "0x3166ce2f5f03be0beff76c614862a681886c1acca4ecda9961ab47e9987655f2", //Civil
  "0xc7b1d7fdac8db0aad96b1ad1fee2b2635306e9360fec7bbdcd59c79a83ce3b66", //Architecture

  "0x1bc06678006b33cf10d7f4a1631a0e03dd7f05e5c1348f884bb0b3af8f3b70c4", // Doctor1
  "0xe8f87a1b739da2e11b02423375193eca2f138d82a931f853304deb181017d0e4", // Pharmacist1
  "0xcad40a4fef10d0dd49ebb54cf25efa2938832918fbef9aea018a80d302814fdf" // Patient1
];

task("accounts", "Prints the list of accounts", async (args, hre): Promise<void> => {
  const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
  accounts.forEach((account: SignerWithAddress): void => {
    console.log(account.address)
  })
})

task("balances", "Prints the list of AVAX account balances", async (args, hre): Promise<void> => {
  const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
  for(const account of accounts){
    const balance: BigNumber = await hre.ethers.provider.getBalance(
      account.address
    );
    console.log(`${account.address} has balance ${balance.toString()}`);
  }
})

export default {
  solidity: {
    compilers: [
      {
        version: "0.5.16"
      },
      {
        version: "0.6.2"
      },
      {
        version: "0.6.4"
      },
      {
        version: "0.7.0"
      },
      {
        version: "0.8.0"
      }
    ]
  },
  paths: {
    sources: './contracts'
  },
  networks: {
    hardhat: {
      gasPrice: 225000000000,
      chainId: !forkingData ? 43112 : undefined, //Only specify a chainId if we are not forking
      forking: forkingData
    },
    local: {
      url: 'http://localhost:9650/ext/bc/spain/rpc',
      gasPrice: 225000000000,
      chainId: 8543,
      accounts: testAccounts
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: []
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: []
    }
  }
}