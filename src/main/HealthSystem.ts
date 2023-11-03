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

    console.log("---------------------------------------------------")
    console.log("-                  Prescription                   -")
    console.log("---------------------------------------------------\n")

    // Load contract already deployed in the subnet
    var stFactory = await ethers.getContractFactory('HealthSystem'); // Interface
    stFactory = stFactory.connect(doctor1); // change the user who sign the transactionn
    let sc = await stFactory.attach(smartContracts.HEALTH_SYSTEM);
    
    // Use the contract loaded
    try
    {
      await sc.prescribe(7347763, patient1.address, doctor1.address, 89, 20, 10, 2023);
      await sc.prescribe(7347764, patient1.address, doctor1.address, 89, 19, 3, 2022);
      await sc.prescribe(7347765, patient1.address, doctor1.address, 89, 4, 6, 2021);
    }
    catch
    {
      console.log("The presciption exist")
    }
  
    await new Promise(f => setTimeout(f, 2000));

    let prescriptions = await sc.getPrescriptionByPatient(patient1.address);

    for(var prescription of prescriptions)
    {
      console.log(await sc.getPrescription(prescription.toNumber()));
    }

    console.log(await sc.getBlockNumber());
  
    console.log("---------------------------------------------------")
    console.log("-                  Dispatch                       -")
    console.log("---------------------------------------------------\n")

    stFactory = stFactory.connect(pharmacist1); // change the user who sign the transaction
    sc = await stFactory.attach(smartContracts.HEALTH_SYSTEM);

    await sc.dispatch(7347763, pharmacist1.address, 21, 10, 2023);

    await new Promise(f => setTimeout(f, 2000));
    console.log(await sc.getDispatches(7347763));

    console.log("---------------------------------------------------")
    console.log("-                  Expire                         -")
    console.log("---------------------------------------------------\n")

    stFactory = stFactory.connect(doctor1); // change the user who sign the transaction
    sc = await stFactory.attach(smartContracts.HEALTH_SYSTEM);

    await sc.expire(7347763);

    await new Promise(f => setTimeout(f, 2000));

    prescriptions = await sc.getPrescriptionByPatient(patient1.address);

    for(var prescription of prescriptions)
    {
      console.log(await sc.getPrescription(prescription.toNumber()));
    }

    console.log("---------------------------------------------------")
    console.log("-       Dispatch Expired Prescription            -")
    console.log("---------------------------------------------------\n")

    stFactory = stFactory.connect(pharmacist1); // change the user who sign the transaction
    sc = await stFactory.attach(smartContracts.HEALTH_SYSTEM);

    try
    {
      await sc.dispatch(7347763, pharmacist1.address, 21, 10, 2023);
    }
    catch
    {
      console.log("The prescription is expired")
    }



}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
