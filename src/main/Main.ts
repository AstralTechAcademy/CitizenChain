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

const loadTestData = async() => {
  // Load hardhat.config.ts addresses
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, healtMinistry] = await ethers.getSigners();

  console.log("DNS test data")

  // Load contract already deployed in the subnet
  var stFactory = await ethers.getContractFactory('Dns'); // Interface
  stFactory = stFactory.connect(admin); // change the user who sign the transactionn
  const sc = await stFactory.attach(smartContracts.DNS);

  try
  {
    await sc.addRegistry("Civil", smartContracts.CIVIL_REGISTER);
    await sc.addRegistry("AC", smartContracts.ACCESS_CONTROL);
    await sc.addRegistry("Doctors", smartContracts.DOCTORS);
    await sc.addRegistry("Pharmacist", smartContracts.PHARMACIST);
    await sc.addRegistry("Prescription", smartContracts.PRESCRIPTION);
    await sc.addRegistry("Dispatch", smartContracts.DISPATCH);
  } 
  catch
  {
    console.log("Contract already added in DNS");
  }

  await new Promise(f => setTimeout(f, 2000));

  console.log("Access control test data")

  // Load contract already deployed in the subnet
  var acFactory = await ethers.getContractFactory('AccessControl'); // Interface
  acFactory = acFactory.connect(admin); // change the user who sign the transaction
  const ac = await acFactory.attach(smartContracts.ACCESS_CONTROL);

  try
  {
    ac.createRole("doctor.admin");
    await new Promise(f => setTimeout(f, 1000));
    ac.assign("doctor.admin", admin.address);
  } 
  catch
  {
    console.log("User already assigned in role doctor.admin");
  }

  await new Promise(f => setTimeout(f, 1000));

  console.log("Civil Registry test data")

  // Load contract already deployed in the subnet
  var civilFactory = await ethers.getContractFactory("CivilRegistry"); // change the user who sign the transactionn
  civilFactory = civilFactory.connect(admin); // change the user who sign the transactionn
  const civilApp = await civilFactory.attach(smartContracts.CIVIL_REGISTER);

  try
  {
    let name = "Francisco";
    let surname1 = "Pérez";
    let surname2 = "García";
    let address = doctor1.address;
    await civilApp.newBirth(address, name, surname1, surname2);

    name = "Maria Pilar";
    surname1 = "Rodríguez";
    surname2 = "Otamendi";
    address = citizen1.address;
    await civilApp.newBirth(address, name, surname1, surname2);
  } 
  catch
  {
  console.log("Users already registered");
  }
}


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
      await list(civilApp);
    } else if (userRes === '2') {
      await newBirth(civilApp);
    } 
  }
}

const newBirth = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, healtMinistry] = await ethers.getSigners();

  console.log("Doctor1: " + doctor1.address)
  console.log("Citizen1: " + citizen1.address)

  let name = readLineSync.question("Name: ");
  let surname1 = readLineSync.question("Surname1: ");
  let surname2 = readLineSync.question("Surname2: ");
  let address = readLineSync.question("Public address: ");

  await sc.newBirth(address, name, surname1, surname2)
}

const addDoctor = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, healtMinistry] = await ethers.getSigners();

  console.log("Doctor1: " + doctor1.address)

  let speciality = "Medicina General";
  let collegiateID = 55643151;
  let bID =  doctor1.address;

  speciality = readLineSync.question("Speciality: ");
  collegiateID = readLineSync.question("Collegiate ID: ");
  bID = readLineSync.question("Blockchain ID: ");

  await sc.addDoctor(bID, speciality, collegiateID, 1);
}

const list = async(sc: any) => {
  const bIDs = await sc.list();

  await new Promise(f => setTimeout(f, 2000));

  for(var bID of bIDs)
  {
    console.log(bID);
  }
}

const healthApp = async() => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, healtMinistry] = await ethers.getSigners();

  // Load contract already deployed in the subnet
  var healthFactory = await ethers.getContractFactory("Doctor"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(admin); // change the user who sign the transactionn
  const healthApp = await healthFactory.attach(smartContracts.DOCTORS);

  let userRes;
  while (userRes !== '0') {
    console.log("");
    console.log("1. List doctors")
    console.log("2. Add doctor")
    let userRes = readLineSync.question("Pick an option: ");
    if (userRes === '1') {
      await list(healthApp);
    } else if (userRes === '2') {
      await addDoctor(healthApp);
    } 
  }
}

const main = async(): Promise<any> => {

// Load hardhat.config.ts addresses
const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, healtMinistry] = await ethers.getSigners();

let userRes;
while (userRes !== '0') {
    console.log("");
    console.log("0. Load test data")
    console.log("1. Civil Register App")
    console.log("2. Health System App")
    console.log("3. Academic System App")
    console.log("4. Create roles")
    userRes = readLineSync.question("Pick an option: ");
    if (userRes === '0') {
      await loadTestData();
    } 
    else if (userRes === '1') {
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
