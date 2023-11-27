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

  const [admin] = await ethers.getSigners();

  // --------------------------------
  var StorageSC = await ethers.getContractFactory("Educa")
  StorageSC = StorageSC.connect(admin);

  var spanishSC = await StorageSC.deploy();
  
  await spanishSC.deployed()
  console.log(`Educa deployed to: ${spanishSC.address}`)

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
