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
  var sc = await ethers.getContractFactory("Dns")
  sc = sc.connect(admin);

  var dnsSC = await sc.deploy();
  
  await dnsSC.deployed()
  console.log(`Dns deployed to: ${dnsSC.address}`)

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
