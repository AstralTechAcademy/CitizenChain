// test/Airdrop.js
// Load dependencies
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const Web3 = require('web3');
const readLineSync = require('readline-sync')
import {testAccounts} from "../hardhat.config";
import { smartContracts } from "./Constants";

//Referencias: 
//https://docs.openzeppelin.com/learn/deploying-and-interacting

const main = async(): Promise<any> => {

    // Load hardhat.config.ts addresses
    const [admin] = await ethers.getSigners();

    // Load contract already deployed in the subnet
    var stFactory = await ethers.getContractFactory('Dns'); // Interface
    stFactory = stFactory.connect(admin); // change the user who sign the transactionn
    const sc = await stFactory.attach(smartContracts.DNS);

    let userRes;
  while (userRes !== '0') {
      console.log("");
      console.log("1. Set")
      console.log("2. Update")
      userRes = readLineSync.question("Pick an option: ");
      if (userRes === '1') {
        try
        {
          await sc.addRegistry("Civil", smartContracts.CIVIL_REGISTER);
          await sc.addRegistry("AC", smartContracts.ACCESS_CONTROL);
          await sc.addRegistry("Doctors", smartContracts.DOCTORS);
          await sc.addRegistry("Pharmacist", smartContracts.PHARMACIST);
          await sc.addRegistry("Prescription", smartContracts.PRESCRIPTION);
          await sc.addRegistry("Laboratory", smartContracts.LABORATORY);
          await sc.addRegistry("Dispatch", smartContracts.DISPATCH);
        } 
        catch
        {
          console.log("Contract already added in DNS");
        }
      } 
      else if (userRes === '2') {
        try
        {
          await sc.updateRegistry("Civil", smartContracts.CIVIL_REGISTER);
          await sc.updateRegistry("AC", smartContracts.ACCESS_CONTROL);
          await sc.updateRegistry("Doctors", smartContracts.DOCTORS);
          await sc.updateRegistry("Pharmacist", smartContracts.PHARMACIST);
          await sc.updateRegistry("Prescription", smartContracts.PRESCRIPTION);
          await sc.updateRegistry("Laboratory", smartContracts.LABORATORY);
          await sc.updateRegistry("Dispatch", smartContracts.DISPATCH);
        } 
        catch
        {
          console.log("Contract already added in DNS");
        }
      }


    await new Promise(f => setTimeout(f, 2000));

    console.log(await sc.count());
    console.log(await sc.getAddress("AC"));
    console.log(await sc.getAddress("Laboratory"));
    }
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
