// test/Airdrop.js
// Load dependencies
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const Web3 = require('web3');
import {testAccounts} from "../hardhat.config";
const readLineSync = require('readline-sync')
import {eRole, smartContracts} from "./Constants";

let signer = ethers.Wallet.fromMnemonic("sausage shadow board sell skill year radio ill fun grunt select sample invite setup level stick lumber worth creek amount example federal mask until", "m/44'/60'/0'/0/0");

const endpoint = "http://localhost:9650/ext/bc/spain/rpc";

//Referencias: 
//https://docs.openzeppelin.com/learn/deploying-and-interacting

const goTo = async(menu: any) => {

  if(menu == 1)
  {
    await menu1();
  } else if (menu == 2)
  {
    await login();
  }

}

const menu1 = async() => {
  let userRes;
  while (userRes !== '0') {
      console.log("");
      console.log("0. Load test data")
      console.log("1. Civil Register App")
      console.log("2. Access Control")
      console.log("3. Health App")
      console.log("4. Academic App")
      userRes = readLineSync.question("Pick an option: ");
      if (userRes === '0') {
        await loadTestData();
      } else if (userRes === '1') {
        await civilApp();
      } else if (userRes === '2') {
        await academicApp();
      } else if (userRes === '3') {
        await healthApp();
      } else if (userRes === '4') {
        await academicApp();
      } 
  }
}

const login = async() => {

  console.log("Funcionario")
  console.log("sausage shadow board sell skill year radio ill fun grunt select sample invite setup level stick lumber worth creek amount example federal mask until") 
  console.log("Director")
  console.log("green broccoli net drama harsh enemy luggage system market sting identify profit love base write feature symptom balance favorite portion tourist sheriff element broccoli") 
  console.log("Doctor")
  console.log("half flash equip rifle city print shoulder all chest song doctor rail pledge live until noise feature alcohol actress spell spoon expand town tonight") 
  console.log("Farmnacéutico")
  console.log("govern miracle grief history warrior almost material brain stumble trash measure follow love blast title long obscure atom despair history rotate cannon only snack") 
  console.log("Paciente")
  console.log("decorate vicious fire misery width toddler midnight table usual knock convince tragic identify leave matrix claw horn vendor april monitor spin soul engage salt") 
  console.log("Estudiante")
  console.log("thrive honey describe tent present know tuition whip lock smoke fish client either duty invite marriage bean lion rule physical move upper crew sorry") 

  let mnemonic = readLineSync.question("Sign in with your mnemonic: ");

  var wallet = ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0");
  signer = new ethers.Wallet(wallet.privateKey, new ethers.providers.JsonRpcProvider(endpoint));

  await goTo(1);


}


const loadTestData = async() => {
  // Load hardhat.config.ts addresses
  const [admin, director, citizen1, funcionario,
    doctor1, pharmacist1, patient1, student1, student2,
    ownerBayer, ownerPfizer, ownerGrifols, bayer, pfizer, grifols] = await ethers.getSigners();

  console.log("DNS test data")

  // Load contract already deployed in the subnet
  var stFactory = await ethers.getContractFactory('Dns'); // Interface
  stFactory = stFactory.connect(admin); // change the user who sign the transactionn
  const sc = await stFactory.attach(smartContracts.DNS);

  try
  {
    await sc.addRegistry("Civil", smartContracts.CIVIL_REGISTER);
    await sc.addRegistry("AC", smartContracts.ACCESS_CONTROL);
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

  try { await ac.createRole("health.admin"); } catch {}
  try { await ac.createRole("health.doctor"); } catch {}
  try { await ac.createRole("health.pharma"); } catch {}
  try { await ac.createRole("health.nurse"); } catch {}
  try { await ac.createRole("sys.admin"); } catch {}
  try { await ac.createRole("sys.read"); } catch {}
  try { await ac.createRole("sys.writer"); } catch {}
  try { await ac.createRole("civil.admin"); } catch {}
  try { await ac.createRole("civil.employee"); } catch {}
  try { await ac.createRole("civil.administration"); } catch {}
  try { await ac.createRole("academic.admin"); } catch {}
  try { await ac.createRole("academic.director"); } catch {}
  try { await ac.createRole("academic.student"); } catch {}

  await new Promise(f => setTimeout(f, 6000));

  try { await ac.assign("health.admin", admin.address); } catch {}
  try { await ac.assign("sys.admin", admin.address); } catch {}
  try { await ac.assign("civil.admin", admin.address); } catch {}
  try { await ac.assign("health.doctor", doctor1.address); } catch {console.log("User not added in doctor role");}
  try { await ac.assign("academic.director", director.address); } catch {console.log("User not added in director role");}
  try { await ac.assign("civil.administration", funcionario.address); } catch {console.log("User not added in civil administration role");}

  await new Promise(f => setTimeout(f, 1000));

  ac.on("assigned", (timestamp:string, addr:string) => {
    console.log("[" + timestamp + "] User " + addr + " added in access control");
  })

  console.log("Civil Registry test data")

  // Load contract already deployed in the subnet
  var civilFactory = await ethers.getContractFactory("CivilRegistry"); // change the user who sign the transactionn
  civilFactory = civilFactory.connect(admin); // change the user who sign the transactionn
  const civilApp = await civilFactory.attach(smartContracts.CIVIL_REGISTER);


  /*name = "Francisco";
  surname1 = "Pérez";
  surname2 = "García";
  address = doctor1.address;
  try { let res =  await civilApp.newBirth(address, name, surname1, surname2); console.log(res) } catch {console.log("Doctor already added")}
  */

  let name = "David";
  let surname1 = "del pino";
  let surname2 = "Ballesteros";
  let address = funcionario.address;
  try { let res1 = await civilApp.newBirth(address, name, surname1, surname2); console.log(res1) } catch {console.log("Owner Funcionario already added")}

  name = "Olivia";
  surname1 = "Gómez";
  surname2 = "Ortega";
  address = ownerGrifols.address;
  try { let res2 = await civilApp.newBirth(address, name, surname1, surname2); console.log(res2) } catch {console.log("Owner Grifols already added")}

  name = "Juan Ignacio";
  surname1 = "Riquelme";
  surname2 = "Macia";
  address = ownerPfizer.address;
  try { let res2 = await civilApp.newBirth(address, name, surname1, surname2); console.log(res2) } catch {console.log("Owner Pfizer already added")}

  name = "Maria Pilar";
  surname1 = "Rodríguez";
  surname2 = "Otamendi";
  address = director.address;
  try { let res3 = await civilApp.newBirth(address, name, surname1, surname2); console.log(res3) } catch {console.log("Owner Director already added")}

  name = "Carmen";
  surname1 = "Jiménez";
  surname2 = "Fuentes";
  address = pharmacist1.address;
  try { let res4 = await civilApp.newBirth(address, name, surname1, surname2); console.log(res4) } catch {console.log("Owner Pharmacist already added")}

  name = "Pilar";
  surname1 = "Velansco";
  surname2 = "Ballesteros";
  address = student1.address;
  try { let res5 = await civilApp.newBirth(address, name, surname1, surname2); console.log(res5) } catch {console.log("Student 'Pilar' already added")}

  name = "Alicia";
  surname1 = "de la Fuente";
  surname2 = "Oliveros";
  address = student2.address;
  try { let res6 = await civilApp.newBirth(address, name, surname1, surname2); console.log(res6) } catch {console.log("Student 'Alicia' already added")}

  await new Promise(f => setTimeout(f, 6000));

  console.log("Laboratories test data")

  // Load contract already deployed in the subnet
  var healthFactory = await ethers.getContractFactory("HealthSystem"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(admin); // change the user who sign the transactionn
  const healthApp = await healthFactory.attach(smartContracts.HEALTH_SYSTEM);

  try { await healthApp.addLaboratory("B28089225", "PFIZER SL", 
      "AVENIDA DE EUROPA - PQ. EMPRESARIAL LA MORALEJA, 20 - B", "MADRID", "ESPAÑA", 
      "0xDcb1e4215595Aaf492eC31472Be4CB419AaAac0b"); } catch {console.log("Pfizer already added")}

  try { await healthApp.addLaboratory("A58389123", "GRIFOLS SA", 
      "CALLE JESUS I MARIA, 6", "BARCELONA", "ESPAÑA", 
      "0x65EDBF5a573813f23faC10DbB68c0cD552557049"); } catch {console.log("Grifols already added")}

  console.log("Medicines test data")

  await new Promise(f => setTimeout(f, 6000));

  var pfizerWallet = ethers.Wallet.fromMnemonic("legal inject devote slam undo process relax multiply finish brave awkward garment edit raven shoe fork sail cheese still feel birth keen flame gentle", "m/44'/60'/0'/0/0");
  let pfizerSigner = new ethers.Wallet(pfizerWallet.privateKey, new ethers.providers.JsonRpcProvider(endpoint));

  var healthFactory = await ethers.getContractFactory("HealthSystem"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(pfizerSigner); // change the user who sign the transactionn
  let healthApp1 = await healthFactory.attach(smartContracts.HEALTH_SYSTEM);

  try { await healthApp1.addMedicine("T59257943", "Paracetamol", "B28089225"); } catch {console.log("Paracetamol already added")}
  try { await healthApp1.addMedicine("X58743527", "Omeoprazol", "B28089225"); } catch {console.log("Omeoprazol already added")}
  
  await new Promise(f => setTimeout(f, 6000));

  var grifolsWallet = ethers.Wallet.fromMnemonic("fun shadow train sting useless toddler pioneer dove fun mirror ghost attitude quarter height load saddle final afraid capable cruel pass order hip supply", "m/44'/60'/0'/0/0");
  let grifolsSigner = new ethers.Wallet(grifolsWallet.privateKey, new ethers.providers.JsonRpcProvider(endpoint));

  var healthFactory = await ethers.getContractFactory("HealthSystem"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(grifolsSigner); // change the user who sign the transactionn
  healthApp1 = await healthFactory.attach(smartContracts.HEALTH_SYSTEM);
  
 await healthApp1.addMedicine("J84958702", "Aspirina", "A58389123"); // } catch {console.log("Aspirina already added")}
  try { await healthApp1.addMedicine("L89443353", "Naproxeno", "A58389123"); } catch {console.log("Naproxeno already added")}

  await new Promise(f => setTimeout(f, 6000));

}


const civilApp = async() => {
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

  // Load contract already deployed in the subnet
  var civilFactory = await ethers.getContractFactory("CivilRegistry"); // change the user who sign the transactionn
  civilFactory = civilFactory.connect(admin); // change the user who sign the transactionn
  const civilApp = await civilFactory.attach(smartContracts.CIVIL_REGISTER);

  let userRes;
  while (userRes !== '0') {
    console.log("");
    console.log("1. Show citizens")
    console.log("2. Register citizen")
    console.log("3. Death")
    console.log("4. Back")
    let userRes = readLineSync.question("Pick an option: ");
    if (userRes === '1') {
      await showPeople(civilApp);
    } else if (userRes === '2') {
      await newBirth(civilApp);
    } else if (userRes === '3') {
      await death(civilApp);
    } else {
      await goTo(1);
    } 
  }
}

const addLaboratory = async(sc: any) => {
  const [admin, director, citizen1, funcionario,
          doctor1, pharmacist1, patient1, student1, student2,
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
  const [admin, director, citizen1, funcionario,
          doctor1, pharmacist1, patient1, student1, student2,
          ownerBayer, ownerPfizer, ownerGrifols, bayer, pfizer, grifols] = await ethers.getSigners();

  console.log("Bayer 24 words: version drop seat blush wood keep average load protect grab once hammer toward vapor voice pyramid hurt fox alcohol aunt pulp fan network market");
  console.log("Funcionario 24 words: sausage shadow board sell skill year radio ill fun grunt select sample invite setup level stick lumber worth creek amount example federal mask until");

  let mnemonic = readLineSync.question("Sign In in the DApp: ");
  var wallet = ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0");

  let user = new ethers.Wallet(wallet.privateKey, new ethers.providers.JsonRpcProvider("http://localhost:9650/ext/bc/spain/rpc"));

  var healthFactory = await ethers.getContractFactory("HealthSystem"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(user); // change the user who sign the transactionn
  const healthApp = await healthFactory.attach(smartContracts.HEALTH_SYSTEM);

  let id = readLineSync.question("Medicine ID: ");
  let name = readLineSync.question("Medicine Name: ");
  let lab = readLineSync.question("Laboratory CIF: ");
  await healthApp.addMedicine(id, name, lab);

  await new Promise(f => setTimeout(f, 2000));

  await healthApp.listMedicines();
}

const newBirth = async(sc: any) => {
  const [admin, director, citizen1, funcionario,
    doctor1, pharmacist1, patient1, student1, student2,
    ownerBayer, ownerPfizer, ownerGrifols, bayer, pfizer, grifols] = await ethers.getSigners();

  console.log("Doctor1: " + doctor1.address)
  console.log("Director: " + director.address)
  console.log("Patient1: " + patient1.address)
  console.log("Student1: " + student1.address)
  console.log("Owner Laboratory: " + ownerBayer.address)

  let name = readLineSync.question("Name: ");
  let surname1 = readLineSync.question("Surname1: ");
  let surname2 = readLineSync.question("Surname2: ");
  let address = readLineSync.question("ID: ");

  await sc.newBirth(address, name, surname1, surname2)
}

const death = async(sc: any) => {
  const [admin, director, citizen1, funcionario,
    doctor1, pharmacist1, patient1, student1, student2,
    ownerBayer, ownerPfizer, ownerGrifols, bayer, pfizer, grifols] = await ethers.getSigners();

  console.log("Doctor1: " + doctor1.address)
  console.log("Director: " + director.address)
  console.log("Patient1: " + patient1.address)
  console.log("Student1: " + student1.address)
  console.log("Owner Laboratory: " + ownerBayer.address)

  let address = readLineSync.question("ID: ");

  await sc.death(address);
}

const addDoctor = async(sc: any) => {
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

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
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

  console.log("Pharmacist1: " + pharmacist1.address)

  let collegiateID = readLineSync.question("Collegiate ID: ");
  let bID = readLineSync.question("Blockchain ID: ");

  await sc.addPharmacist(bID, collegiateID);
}

const  addDegree = async(sc: any) => {
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

  await listInstitutions(sc);

  let degreeID = readLineSync.question("Degree ID: ");
  let name = readLineSync.question("Name: ");
  let intitutionID = readLineSync.question("Institution ID: ");

  await sc.addDegree(degreeID, name, intitutionID);
}

const addInstitution = async(sc: any) => {
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

  let name = readLineSync.question("Name: ");
  let id = readLineSync.question("Institution ID: ");

  await sc.addInstitution(id, name, director.address);
}

const addStudent = async(sc: any) => {
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

  var factory = await ethers.getContractFactory("AcademicApp"); // change the user who sign the transactionn
  factory = factory.connect(director); // change the user who sign the transactionn
  const academicApp = await factory.attach(smartContracts.ACADEMIC_APP);

  console.log("Student1: " + student1.address)

  let degreeID = readLineSync.question("Degree ID: ");
  let studentID = readLineSync.question("Student ID: ");
  let institutionID = readLineSync.question("Institution ID: ");

  await academicApp.addStudent(studentID, institutionID, degreeID);
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
    var item = await sc.getLaboratory(bID);
    console.log("[" + item.id_ + "] " + item.name_ + " " + 
                  item.street_ + " " + item.city_ + " " + item.country_ + " " + item.owner_);
  }
}

const listMedicines = async(sc: any) => {
  const bIDs = await sc.listMedicines();

  await new Promise(f => setTimeout(f, 2000));

  for(var bID of bIDs)
  {
    var medicine = await sc.getMedicine(bID);
    console.log("[" + medicine.id_ + "] " + medicine.name_ + " " + medicine.laboratoryID_);
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
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

  console.log("Doctor 24 words: half flash equip rifle city print shoulder all chest song doctor rail pledge live until noise feature alcohol actress spell spoon expand town tonight");
  console.log("Funcionario 24 words: sausage shadow board sell skill year radio ill fun grunt select sample invite setup level stick lumber worth creek amount example federal mask until");

  let mnemonic = readLineSync.question("Sign In with your mnemonic: ");
  var wallet = ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0");

  let user = new ethers.Wallet(wallet.privateKey, new ethers.providers.JsonRpcProvider("http://localhost:9650/ext/bc/spain/rpc"));

  var healthFactory = await ethers.getContractFactory("HealthSystem"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(signer); // change the user who sign the transactionn
  const healthApp = await healthFactory.attach(smartContracts.HEALTH_SYSTEM);

  console.log("Patient1: " + patient1.address)

  let medicineID = readLineSync.question("Medicine ID: ");
  let patientID = readLineSync.question("Patient ID: ");
  let dateTime = new Date()
  let day = dateTime.getDay()
  let month = dateTime.getMonth()
  let year = dateTime.getFullYear()

  await healthApp.prescribe(Math.floor(Math.random() * (10000 - 0 + 1) + 0), patientID, medicineID, day, month, year);

}

const dispatch = async(sc: any) => {
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

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
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

  console.log("Director 24 words: green broccoli net drama harsh enemy luggage system market sting identify profit love base write feature symptom balance favorite portion tourist sheriff element broccoli");
  console.log("Student 24 words: sausage shadow board sell skill year radio ill fun grunt select sample invite setup level stick lumber worth creek amount example federal mask until");

  let mnemonic = readLineSync.question("Sign In with your mnemonic: ");
  var wallet = ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0");

  let user = new ethers.Wallet(wallet.privateKey, new ethers.providers.JsonRpcProvider("http://localhost:9650/ext/bc/spain/rpc"));

  var factory = await ethers.getContractFactory("AcademicApp"); // change the user who sign the transactionn
  factory = factory.connect(user); // change the user who sign the transactionn
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
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

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
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

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

const showPatientRecord = async(sc: any) => {
    console.log("//TODO");
}


const healthApp = async() => {
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

  // Load contract already deployed in the subnet
  var healthFactory = await ethers.getContractFactory("HealthSystem"); // change the user who sign the transactionn
  healthFactory = healthFactory.connect(admin); // change the user who sign the transactionn
  const healthApp = await healthFactory.attach(smartContracts.HEALTH_SYSTEM);

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
    console.log("13. Show patient record")
    console.log("14. Back")
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
    } else if (userRes === '13') {
      await showPatientRecord(healthApp);
    } 
    else if (userRes === '14') {
      await goTo(1);
    } 
  }
}

const academicApp = async() => {
  const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

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
    console.log("10. Back")
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
    } else if (userRes === '10') {
      await goTo(1);
    } 
  }
}

const main = async(): Promise<any> => {

// Load hardhat.config.ts addresses
const [admin, director, citizen1, funcionario, doctor1, pharmacist1, patient1, student1, student2] = await ethers.getSigners();

var url = 'http://localhost:9650/ext/bc/spain/rpc';
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
console.log(await customHttpProvider.getBalance(admin.address));
console.log(await customHttpProvider.getBlockNumber());
  
await login();

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
