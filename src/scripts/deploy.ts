import { 
  Contract, 
  ContractFactory 
} from "ethers"
import { ethers } from "hardhat"

const main = async(): Promise<any> => {

  const [admin, citizen1] = await ethers.getSigners();

  // --------------------------------
  var StorageSC = await ethers.getContractFactory("SpanishDNS")
  StorageSC = StorageSC.connect(admin);

  var spanishSC = await StorageSC.deploy();
  
  await spanishSC.deployed()
  console.log(`SpanishDNS deployed to: ${spanishSC.address}`)
  
  
  // -------------------------------
  let contracts = ["AccessControl", "TitleRegistry", "Education", "Doctor", "Prescription", "Pharmacist", "Dispatch", "HealthSystem"];

  for(var name of contracts)
  {
    StorageSC  = await ethers.getContractFactory(name)
    StorageSC = StorageSC.connect(admin);
  
    var storage = await StorageSC.deploy();
  
    await storage.deployed()
    console.log(`${name} deployed to: ${storage.address}`)
  }

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
