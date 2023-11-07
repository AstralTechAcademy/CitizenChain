// test/Airdrop.js
// Load dependencies
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const Web3 = require('web3');
import {testAccounts} from "../hardhat.config";
const readLineSync = require('readline-sync')
import {eRole, smartContracts} from "./Constants";

//Referencias: 
//https://docs.openzeppelin.com/learn/deploying-and-interacting

const civilApp = async() => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, healtMinistry] = await ethers.getSigners();

  // Load contract already deployed in the subnet
  var civilFactory = await ethers.getContractFactory("CivilRegistry"); // change the user who sign the transactionn
  civilFactory = civilFactory.connect(admin); // change the user who sign the transactionn
  const civilApp = await civilFactory.attach(smartContracts.CIVIL_REGISTER);

  let userRes;
  while (userRes !== '0') {
    console.log("");
    console.log("1. List people")
    console.log("2. Register new birth")
    let userRes = readLineSync.question("Pick an option: ");
    if (userRes === '1') {
      await listPeople(civilApp);
    } else if (userRes === '2') {
      await newBirth(civilApp);
    } 
  }
}

const newBirth = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, healtMinistry] = await ethers.getSigners();

  console.log("Doctor1: " + doctor1.address)
  console.log("Citizen1: " + citizen1.address)

  let name = "Francisco";
  let surname1 = "Pérez";
  let surname2 = "García";
  let address = doctor1.address

  name = readLineSync.question("Name: ");
  surname1 = readLineSync.question("Surname1: ");
  surname2 = readLineSync.question("Surname2: ");
  address = readLineSync.question("Public address: ");

  await sc.newBirth(address, name, surname1, surname2)
}

const listPeople = async(sc: any) => {
  const people = await sc.list();

  await new Promise(f => setTimeout(f, 2000));

  for(var person of people)
  {
    console.log(person);
  }
}

const healthApp = async() => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, healtMinistry] = await ethers.getSigners();

  // Load contract already deployed in the subnet
  var healthFactory = await ethers.getContractFactory("HealthSystem"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(admin); // change the user who sign the transactionn
  const healthApp = await healthFactory.attach(smartContracts.HEALTH_SYSTEM);
}

const main = async(): Promise<any> => {

// Load hardhat.config.ts addresses
const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, healtMinistry] = await ethers.getSigners();

let userRes;
while (userRes !== '0') {
    console.log("");
    console.log("1. Civil Register App")
    console.log("2. Health System App")
    console.log("3. Academic System App")
    console.log("4. Create roles")
    userRes = readLineSync.question("Pick an option: ");
    if (userRes === '1') {
      await civilApp();
    } else if (userRes === '2') {
      await healthApp();
    } 
}

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
