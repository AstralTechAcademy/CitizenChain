import { 
  Contract, 
  ContractFactory 
} from "ethers"
import { ethers } from "hardhat"

const main = async(): Promise<any> => {

  const [admin, citizen1] = await ethers.getSigners();

  // --------------------
  var StorageSC  = await ethers.getContractFactory("AccessControl")
  StorageSC = StorageSC.connect(admin);

  var storage: Contract = await StorageSC.deploy();

  await storage.deployed()
  console.log(`Smart contract deployed to: ${storage.address}`)

  // --------------------
  StorageSC  = await ethers.getContractFactory("TitleRegistry")
  StorageSC = StorageSC.connect(admin);

  storage = await StorageSC.deploy();

  await storage.deployed()
  console.log(`Smart contract deployed to: ${storage.address}`)

  // --------------------
  StorageSC  = await ethers.getContractFactory("Education")
  StorageSC = StorageSC.connect(admin);

  storage = await StorageSC.deploy();

  await storage.deployed()
  console.log(`Smart contract deployed to: ${storage.address}`)

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
