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
    const [admin, citizen1, upm, uoc, uam] = await ethers.getSigners();

    // Load contract already deployed in the subnet
    var stFactory = await ethers.getContractFactory('Institutions'); // Interface
    stFactory = stFactory.connect(admin); // change the user who sign the transactionn
    const sc = await stFactory.attach(smartContracts.INSTITUTIONS);
    
    // Use the contract loaded
    await sc.addInstitution(upm.address, "Univesidad Politécnica de Madrid");
    await sc.addInstitution(uoc.address, "Univesidad Oberta de Cataluña");
    await sc.addInstitution(uam.address, "Univesidad Autónoma de Madrid");

    await new Promise(f => setTimeout(f, 2000));

    console.log(await sc.getInstitution(upm.address));
    console.log(await sc.getInstitution(uoc.address));
    console.log(await sc.getInstitution(uam.address));

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
