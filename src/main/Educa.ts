// test/Airdrop.js
// Load dependencies
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const Web3 = require('web3');
import {testAccounts} from "../hardhat.config";
import { smartContracts } from "./Constants";

//Referencias: 
//https://docs.openzeppelin.com/learn/deploying-and-interacting

const main = async(): Promise<any> => {

    // Load hardhat.config.ts addresses
    const [admin, citizen1] = await ethers.getSigners();

        // Load contract already deployed in the subnet
    var stFactory = await ethers.getContractFactory('Educa'); // Interface
    stFactory = stFactory.connect(admin); // change the user who sign the transactionn
    const sc = await stFactory.attach(smartContracts.EDUCA_FUJI);

    await new Promise(f => setTimeout(f, 2000));
  
    console.log(await sc.safeMint(citizen1.address, 0));

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
