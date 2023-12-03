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
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

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
    await sc.addRegistry("Laboratory", smartContracts.LABORATORY);
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
    ac.createRole("health.admin");
    await new Promise(f => setTimeout(f, 1000));
    ac.assign("health.admin", admin.address);
  } 
  catch
  {
    console.log("User already assigned in role health.admin");
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

    name = "Carmen";
    surname1 = "Jiménez";
    surname2 = "Fuentes";
    address = pharmacist1.address;
    await civilApp.newBirth(address, name, surname1, surname2);

    name = "Pilar";
    surname1 = "Velansco";
    surname2 = "Ballesteros";
    address = student1.address;
    await civilApp.newBirth(address, name, surname1, surname2);

    name = "Alicia";
    surname1 = "de la Fuente";
    surname2 = "Oliveros";
    address = student2.address;
    await civilApp.newBirth(address, name, surname1, surname2);
  } 
  catch
  {
  console.log("Users already registered");
  }
}


const civilApp = async() => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  // Load contract already deployed in the subnet
  var civilFactory = await ethers.getContractFactory("CivilRegistry"); // change the user who sign the transactionn
  civilFactory = civilFactory.connect(admin); // change the user who sign the transactionn
  const civilApp = await civilFactory.attach(smartContracts.CIVIL_REGISTER);

  let userRes;
  while (userRes !== '0') {
    console.log("");
    console.log("1. Show people")
    console.log("2. Register new birth")
    let userRes = readLineSync.question("Pick an option: ");
    if (userRes === '1') {
      await showPeople(civilApp);
    } else if (userRes === '2') {
      await newBirth(civilApp);
    } 
  }
}

const addLaboratory = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, 
          doctor1, pharmacist1, patient1, student1, student2, healtMinistry,
          ownerBayer, ownerPfizer, ownerGrifols, bayer, pfizer, grifols] = await ethers.getSigners();

  console.log("Owner Bayer: " + ownerBayer.address)
  console.log("Owner Pfizer: " + ownerPfizer.address)
  console.log("Owner Grifols: " + ownerGrifols.address)
  console.log("Bayer: " + bayer.address)
  console.log("Pfizer: " + pfizer.address)
  console.log("Grifols: " + grifols.address)

  let cif = readLineSync.question("Laboratie CIF: ");
  let name = readLineSync.question("Name: ");
  let street = readLineSync.question("Street: ");
  let city = readLineSync.question("City: ");
  let country = readLineSync.question("Country ");
  let owner = readLineSync.question("Owner: ");
  await sc.addLaboratory(cif, name, street, city, country, owner);

  await new Promise(f => setTimeout(f, 2000));

  await sc.listLaboratories();
}

const addMedicine = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, 
          doctor1, pharmacist1, patient1, student1, student2, healtMinistry,
          ownerBayer, ownerPfizer, ownerGrifols, bayer, pfizer, grifols] = await ethers.getSigners();

  console.log("Owner Bayer: " + ownerBayer.address)
  console.log("Owner Pfizer: " + ownerPfizer.address)
  console.log("Owner Grifols: " + ownerGrifols.address)
  console.log("Bayer: " + bayer.address)
  console.log("Pfizer: " + pfizer.address)
  console.log("Grifols: " + grifols.address)

  let id = readLineSync.question("Medicine ID: ");
  let name = readLineSync.question("Medicine Name: ");
  let lab = readLineSync.question("Laboratie CIF: ");
  let representative = readLineSync.question("Laboratory agent: ");
  await sc.addMedicine(id, name, lab);

  await new Promise(f => setTimeout(f, 2000));

  await sc.listMedicines();
}

const newBirth = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  console.log("Doctor1: " + doctor1.address)
  console.log("Citizen1: " + citizen1.address)
  console.log("Patient1: " + patient1.address)
  console.log("Student1: " + student1.address)

  let name = readLineSync.question("Name: ");
  let surname1 = readLineSync.question("Surname1: ");
  let surname2 = readLineSync.question("Surname2: ");
  let address = readLineSync.question("Public address: ");

  await sc.newBirth(address, name, surname1, surname2)
}

const addDoctor = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  console.log("Doctor1: " + doctor1.address)

  let speciality = "Medicina General";
  let collegiateID = 55643151;
  let bID =  doctor1.address;

  speciality = readLineSync.question("Speciality: ");
  collegiateID = readLineSync.question("Collegiate ID: ");
  bID = readLineSync.question("Blockchain ID: ");

  await sc.addDoctor(bID, speciality, collegiateID, 1);
}

const addPharmacist = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  console.log("Pharmacist1: " + pharmacist1.address)

  let collegiateID = readLineSync.question("Collegiate ID: ");
  let bID = readLineSync.question("Blockchain ID: ");

  await sc.addPharmacist(bID, collegiateID);
}

const addDegree = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  await listInstitutions(sc);

  let degreeID = readLineSync.question("Degree ID: ");
  let name = readLineSync.question("Name: ");
  let intitutionID = readLineSync.question("Institution ID: ");

  await sc.addDegree(degreeID, name, intitutionID);
}

const addInstitution = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  let name = readLineSync.question("Name: ");
  let id = readLineSync.question("Institution ID: ");

  await sc.addInstitution(id, name);
}

const addStudent = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  console.log("Student1: " + student1.address)

  let degreeID = readLineSync.question("Degree ID: ");
  let studentID = readLineSync.question("Student ID: ");
  let institutionID = readLineSync.question("Institution ID: ");

  await sc.addStudent(studentID, institutionID, degreeID);
}

const list = async(sc: any) => {
  const bIDs = await sc.listDoctors();

  await new Promise(f => setTimeout(f, 2000));

  for(var bID of bIDs)
  {
    console.log(bID);
  }
}

const listLabs = async(sc: any) => {
  const bIDs = await sc.listLaboratories();

  await new Promise(f => setTimeout(f, 2000));

  for(var bID of bIDs)
  {
    console.log(bID);
  }
}

const listMedicines = async(sc: any) => {
  const bIDs = await sc.listMedicines();

  await new Promise(f => setTimeout(f, 2000));

  for(var bID of bIDs)
  {
    console.log(bID);
  }
}

const listPharmacists = async(sc: any) => {
  const bIDs = await sc.listPharmacists();

  await new Promise(f => setTimeout(f, 2000));

  for(var bID of bIDs)
  {
    console.log(bID);
  }
}

const listInstitutions = async(sc: any) => {
  const bIDs = await sc.listInstitutions();

  await new Promise(f => setTimeout(f, 2000));

  for(var bID of bIDs)
  {
    let institutcion = await sc.getInstitution(bID);
    console.log(institutcion.name_ + " " + institutcion.id_);
  }
}

const listDegrees = async(sc: any) => {
  const bIDs = await sc.listInstitutions();

  await new Promise(f => setTimeout(f, 2000));

  for(var bID of bIDs)
  {
    let institutcion = await sc.getInstitution(bID);
    console.log(institutcion.name_)
    console.log("----------------------------")

    let degreeIDs = await sc.getDegreesByInstitution(institutcion.id_);

    for(var degreeID of degreeIDs)
    {
      let degree = await sc.getDegree(degreeID);
      console.log(degree.id_ + " " + degree.name_);
    }

  }
}

const listStudentsByDegree = async(sc: any) => {
  const bIDs = await sc.listInstitutions();

  await new Promise(f => setTimeout(f, 2000));

  for(var bID of bIDs)
  {
    let institutcion = await sc.getInstitution(bID);
    console.log(institutcion.name_)
    console.log("----------------------------")

    let degreeIDs = await sc.getDegreesByInstitution(institutcion.id_);

    for(var degreeID of degreeIDs)
    {
      let students = await sc.getStudentsByDegree(degreeID);
      console.log(degreeID + ": " + students);
    }

  }
}

const listMyDegrees = async(sc: any) => {

  let mnemonic = readLineSync.question("Sign In with your mnemonic: ");

  //mnemonic = "thrive honey describe tent present know tuition whip lock smoke fish client either duty invite marriage bean lion rule physical move upper crew sorry"
  var student1 = ethers.Wallet.fromMnemonic(mnemonic)
  
  let degrees = await sc.getDegreesByStudent(student1.address);

  console.log(degrees);
}

const listMyTitles = async(sc: any) => {

  let mnemonic = readLineSync.question("Sign In with your mnemonic: ");

  //mnemonic = "thrive honey describe tent present know tuition whip lock smoke fish client either duty invite marriage bean lion rule physical move upper crew sorry"
  var student1 = ethers.Wallet.fromMnemonic(mnemonic)
  
  let titles = await sc.getTitlesByStudent(student1.address);

  console.log(titles);

  for(let title of titles)
    console.log(await sc.getTitle(title));
}

const prescribe = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();


  console.log("Patient1: " + patient1.address)

  let medicineID = readLineSync.question("Medicine ID: ");
  let patientID = readLineSync.question("Patient ID: ");
  let dateTime = new Date()
  let day = dateTime.getDay()
  let month = dateTime.getMonth()
  let year = dateTime.getFullYear()

  // Load contract already deployed in the subnet
  var healthFactory = await ethers.getContractFactory("HealthSystem"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(doctor1); // change the user who sign the transactionn
  const healthApp = await healthFactory.attach(smartContracts.HEALTH_SYSTEM);

  await healthApp.prescribe(Math.floor(Math.random() * (10000 - 0 + 1) + 0), patientID, medicineID, day, month, year);

}

const dispatch = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  let prescriptionID = readLineSync.question("Presciption ID: ");
  let dateTime = new Date()
  let day = dateTime.getDay()
  let month = dateTime.getMonth()
  let year = dateTime.getFullYear()

  // Load contract already deployed in the subnet
  var healthFactory = await ethers.getContractFactory("HealthSystem"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(pharmacist1); // change the user who sign the transactionn
  const healthApp = await healthFactory.attach(smartContracts.HEALTH_SYSTEM);

  await healthApp.dispatch(prescriptionID, day, month, year);

}

const emitTitle = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  let mnemonic = readLineSync.question("Sign In with your mnemonic: ");
  var signer = ethers.Wallet.fromMnemonic(mnemonic)

  var factory = await ethers.getContractFactory("AcademicApp"); // change the user who sign the transactionn
  factory = factory.connect(admin); // change the user who sign the transactionn
  const academicApp = await factory.attach(smartContracts.ACADEMIC_APP);

  let titleID = readLineSync.question("Title ID: ");
  let institutionID = readLineSync.question("Institution ID: ");
  let degreeID = readLineSync.question("Degree ID: ");
  //let studentID = readLineSync.question("Student ID: ");
  let dateTime = new Date()
  let year = dateTime.getFullYear();

  await academicApp.emitTitle(titleID, institutionID, degreeID, student1.address, year);

}

const showPrescriptions = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  console.log("Patient1: " + patient1.address)

  let patientID = readLineSync.question("Patitent ID: ");

  var healthFactory = await ethers.getContractFactory("HealthSystem"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(doctor1); // change the user who sign the transactionn
  const healthApp = await healthFactory.attach(smartContracts.HEALTH_SYSTEM);
  
  let prescriptions = await healthApp.getPrescriptionByPatient(patientID);

  for(var prescription of prescriptions)
  {
    let pre = await healthApp.getPrescription(prescription);
    let medicineItem = await healthApp.getMedicine(pre.medicine_);
    console.log("[" + pre.id_ +  "] " + pre.medicine_ + "-" + medicineItem.name_);
  }
}

const showDispatches = async(sc: any) => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  let preID = readLineSync.question("Prescription ID: ");

  var healthFactory = await ethers.getContractFactory("HealthSystem"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(pharmacist1); // change the user who sign the transactionn
  const healthApp = await healthFactory.attach(smartContracts.HEALTH_SYSTEM);
  
  let dispatches = await healthApp.getDispatchesByPrescription(preID);

  console.log(dispatches)

  /*for(var dispatch of dispatches)
  {
    let pre = await healthApp.getDispatch(dispatch);
    //let medicineItem = await healthApp.getMedicine(pre.medicine_);
    //console.log("[" + pre.id_ +  "] " + pre.medicine_ + "-" + medicineItem.name_);
  }*/
}

const showPeople = async(sc: any) => {  
  let peopleAddr = await sc.list();

  console.log(peopleAddr)

  for(var personAddr of peopleAddr)
  {
    console.log(await sc.showPerson(personAddr));
    //let medicineItem = await healthApp.getMedicine(pre.medicine_);
    //console.log("[" + pre.id_ +  "] " + pre.medicine_ + "-" + medicineItem.name_);
  }
}


const healthApp = async() => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  // Load contract already deployed in the subnet
  var healthFactory = await ethers.getContractFactory("HealthSystem"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(admin); // change the user who sign the transactionn
  const healthApp = await healthFactory.attach(smartContracts.HEALTH_SYSTEM);

  // Load contract already deployed in the subnet
  var doctorFactory = await ethers.getContractFactory("Doctor"); // change the user who sign the transactionn
  doctorFactory = doctorFactory.connect(admin); // change the user who sign the transactionn
  const doctorApp = await doctorFactory.attach(smartContracts.DOCTORS);

  // Load contract already deployed in the subnet
  var labactory = await ethers.getContractFactory("Laboratory"); // change the user who sign the transactionn
  labactory = labactory.connect(admin); // change the user who sign the transactionn
  const labApp = await labactory.attach(smartContracts.LABORATORY);

  let userRes;
  while (userRes !== '0') {
    console.log("");
    console.log("1. List doctors")
    console.log("2. List laboratories")
    console.log("3. List medicines")
    console.log("4. List pharmacist")
    console.log("5. Add doctor")
    console.log("6. Add laboratories")
    console.log("7. Add medicine")
    console.log("8. Add pharmacist")
    console.log("9. Prescribe medicine")
    console.log("10. Show presciptions")
    console.log("11. Dispatch")
    console.log("12. Show dispatches")
    let userRes = readLineSync.question("Pick an option: ");
    if (userRes === '1') {
      await list(healthApp);
    } else if (userRes === '2') {
      await listLabs(healthApp);
    } else if (userRes === '3') {
      await listMedicines(healthApp);
    } else if (userRes === '4') {
      await listPharmacists(healthApp);
    } else if (userRes === '5') {
      await addDoctor(healthApp);
    } else if (userRes === '6') {
      await addLaboratory(healthApp);
    } else if (userRes === '7') {
      await addMedicine(healthApp);
    } else if (userRes === '8') {
      await addPharmacist(healthApp);
    } else if (userRes === '9') {
      await prescribe(healthApp);
    } else if (userRes === '10') {
      await showPrescriptions(healthApp);
    } else if (userRes === '11') {
      await dispatch(healthApp);
    } else if (userRes === '12') {
      await showDispatches(healthApp);
    } 
  }
}

const academicApp = async() => {
  const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

  // Load contract already deployed in the subnet
  var factory = await ethers.getContractFactory("AcademicApp"); // change the user who sign the transactionn
  factory = factory.connect(admin); // change the user who sign the transactionn
  const academicApp = await factory.attach(smartContracts.ACADEMIC_APP);

  let userRes;
  while (userRes !== '0') {
    console.log("");
    console.log("1. List institutions")
    console.log("2. List degrees")
    console.log("3. List students by degree")
    console.log("4. List my degrees")
    console.log("5. List my titles")
    console.log("6. Add institution")
    console.log("7. Add degree")
    console.log("8. Add student")
    console.log("9. Dispatch title")
    let userRes = readLineSync.question("Pick an option: ");
    if (userRes === '1') {
      await listInstitutions(academicApp);
    } else if (userRes === '2') {
      await listDegrees(academicApp);
    } else if (userRes === '3') {
      await listStudentsByDegree(academicApp);
    } else if (userRes === '4') {
      await listMyDegrees(academicApp);      
    } else if (userRes === '5') {
      await listMyTitles(academicApp);          
    } else if (userRes === '6') {
      await addInstitution(academicApp);
    } else if (userRes === '7') {
      await addDegree(academicApp);
    } else if (userRes === '8') {
      await addStudent(academicApp);
    } else if (userRes === '9') {
      await emitTitle(academicApp);
    } 
  }
}

const main = async(): Promise<any> => {

// Load hardhat.config.ts addresses
const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, student2, healtMinistry] = await ethers.getSigners();

var url = 'http://localhost:9650/ext/bc/spain/rpc';
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
console.log(await customHttpProvider.getBalance(admin.address));
console.log(await customHttpProvider.getBlockNumber());
  
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
    } else if (userRes === '3') {
      await academicApp();
    } 
}

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
