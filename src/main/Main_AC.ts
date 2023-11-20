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


const listUser = async(sc: any) => {
  var userRes = readLineSync.question("Pick the address of the user: ");

  console.log(await sc.get(userRes));
}

const addUser = async(sc: any) => {
  var userRes = readLineSync.question("Pick the public address of the user: ");

  await sc.assign("health.admin", userRes);

}

const createRole = async(sc: any) => {
  var roleName = readLineSync.question("Pick the role name: ");

  await sc.createRole(roleName);

}



const main = async(): Promise<any> => {



    /* Load test addresses
    var mnemonic = "float injury estate symbol canal pudding wonder manual castle ten input final exit hammer tattoo shoulder symbol video describe fresh asset tribe convince black"
    var admin = ethers.Wallet.fromMnemonic(mnemonic)

    mnemonic = "good glare clinic penalty domain pilot sport captain elbow tent fame top meadow manage purse weather trend physical usage found grain veteran sorry frozen"
    const citizen = ethers.Wallet.fromMnemonic(mnemonic)

    console.log("Signer Pub key: " + admin.address )
    console.log("Signer Priv key: " + admin.privateKey )
    console.log("Citizen1 Pub key: " + citizen1.address )
    console.log("Citizen1 Priv key: " + citizen1.privateKey )*/

    // Load hardhat.config.ts addresses
    const [admin, citizen1, upm, uoc, uam, teleco, computer, aero, civil, architecture, doctor1, pharmacist1, patient1, student1, healtMinistry] = await ethers.getSigners();


    // Load contract already deployed in the subnet
    var stFactory = await ethers.getContractFactory('AccessControl'); // Interface
    stFactory = stFactory.connect(admin); // change the user who sign the transactionn
    const sc = await stFactory.attach(smartContracts.ACCESS_CONTROL);

    sc.on("assigned", (timestamp:string, addr:string) => {
      console.log("[" + timestamp + "] User " + addr + " added in access control");
    })

    let userRes;
    while (userRes !== '0') {
        console.log("");
        console.log("1. List users by role")
        console.log("2. Assign user to role")
        console.log("3. Count roles")
        console.log("4. Create roles")
        userRes = readLineSync.question("Pick an option: ");
        if (userRes === '1') {
          await listUser(sc);
        } else if (userRes === '2') {
          console.log("Admin public address: " + admin.address)
          console.log("Citizen1 public address: " + citizen1.address)
          console.log("Doctor public address: " + doctor1.address)
          console.log("Healt Ministry public address: " + healtMinistry.address)

          await addUser(sc);
        } 
        else if(userRes == '3')
        {
          console.log(await sc.count());
        }
        else if(userRes == '4')
        {
          await createRole(sc)
        }
    }

/*



    
    // Use the contract loaded
    //await sc.addAcademicInstitution(admin.address);
    console.log(await sc.getInstitution(0));
    console.log(await sc.getInstitution(1));
    */
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
