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
    const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1] = await ethers.getSigners();

    // Load contract already deployed in the subnet
    var stFactory = await ethers.getContractFactory('HealthSystem'); // Interface
    stFactory = stFactory.connect(doctor1); // change the user who sign the transactionn
    const sc = await stFactory.attach(smartContracts.HEALTH_SYSTEM);
    
    // Use the contract loaded
    await sc.prescribe(7347763, patient1.address, doctor1.address, 89, 20, 10, 2023);

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
