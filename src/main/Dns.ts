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
  while (userRes !== '0') 
  {
    console.log("");
    console.log("1. Set")
    console.log("2. Update")
    userRes = readLineSync.question("Pick an option: ");
    if (userRes === '1') 
    {
      try { await sc.addRegistry("EducationData", smartContracts.EDUCATION_DATA);
        console.log("EducationData added in DNS") } catch {console.log("EducationData already added in DNS"); }
      try { await sc.addRegistry("HealthData", smartContracts.HEALTH_DATA);
        console.log("HealthData added in DNS") } catch {console.log("HealthData already added in DNS"); }

      try {  await sc.addRegistry("Civil", smartContracts.CIVIL_REGISTER);
        console.log("Civil added in DNS") } catch {console.log("Civil already added in DNS"); }
      try {  await sc.addRegistry("AC", smartContracts.ACCESS_CONTROL);
        console.log("AccessControl added in DNS") } catch {console.log("AccessControl already added in DNS"); }
      try {  await sc.addRegistry("AcademicApp", smartContracts.ACADEMIC_APP);
        console.log("AcademicApp added in DNS") } catch {console.log("AcademicApp already added in DNS"); }
      try { await sc.addRegistry("HealthSystem", smartContracts.HEALTH_SYSTEM);
        console.log("HealthSystem added in DNS")  } catch {console.log("HealthSystem already added in DNS"); }         
    } 
    else if (userRes === '2') 
    {
      try { await sc.updateRegistry("EducationData", smartContracts.EDUCATION_DATA);
        console.log("EducationData added in DNS") } catch {console.log("EducationData already added in DNS"); }
      try { await sc.updateRegistry("HealthData", smartContracts.HEALTH_DATA);
        console.log("HealthData added in DNS") } catch {console.log("HealthData already added in DNS"); }

      try { await sc.updateRegistry("Civil", smartContracts.CIVIL_REGISTER);
        console.log("Civil added in DNS") } catch {console.log("Civil already added in DNS"); }
      try { await sc.updateRegistry("AC", smartContracts.ACCESS_CONTROL);
        console.log("Access Control added in DNS") } catch {console.log("Access Control already added in DNS"); }
      try { await sc.updateRegistry("AcademicApp", smartContracts.ACADEMIC_APP);
        console.log("AcademicApp added in DNS") } catch {console.log("AcademicApp already added in DNS"); }
      try { await sc.updateRegistry("HealthSystem", smartContracts.HEALTH_SYSTEM);
        console.log("HealthSystem added in DNS") } catch {console.log("HealthSystem already added in DNS"); }
    }
  }

  await new Promise(f => setTimeout(f, 2000));

  console.log(await sc.count());
  console.log(await sc.getAddress("AC"));
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
