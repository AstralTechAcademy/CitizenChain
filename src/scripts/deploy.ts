import { 
  Contract, 
  ContractFactory 
} from "ethers"
import { ethers } from "hardhat"

const HEALTH_ADMIN_ROLE = 6000;
const EDUCATION_ADMIN_ROLE = 6001;

enum eRole
{
    NONE,
    VIEWER,
    WRITER,
    ADMIN
}

const main = async(): Promise<any> => {

  const [admin, citizen1] = await ethers.getSigners();

  // --------------------------------
  var StorageSC = await ethers.getContractFactory("Dns")
  StorageSC = StorageSC.connect(admin);

  var spanishSC = await StorageSC.deploy();
  
  await spanishSC.deployed()
  console.log(`Dns deployed to: ${spanishSC.address}`)

  StorageSC = await ethers.getContractFactory("AccessControl")
  StorageSC = StorageSC.connect(admin);

  var accessControlSC = await StorageSC.deploy();
  
  await accessControlSC.deployed()
  console.log(`Access Control deployed to: ${accessControlSC.address}`)
  
  
  // -------------------------------
  let contracts = ["TitleRegistry", "Education", "Doctor", "Prescription", "Pharmacist", "Dispatch", "HealthSystem"];

  for(var name of contracts)
  {
    StorageSC  = await ethers.getContractFactory(name)
    StorageSC = StorageSC.connect(admin);
  
    var storage = await StorageSC.deploy();
  
    await storage.deployed()
    console.log(`${name} deployed to: ${storage.address}`)

    if(name == "HealthSystem")
    {
      var stFactory = await ethers.getContractFactory('AccessControl'); // Interface
      stFactory = stFactory.connect(admin); // change the user who sign the transactionn
      let sc = await stFactory.attach(accessControlSC.address);
      sc.assign(6000, storage.address);
    }
  }

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
