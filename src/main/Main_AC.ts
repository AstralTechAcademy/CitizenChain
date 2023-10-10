// test/Airdrop.js
// Load dependencies
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const Web3 = require('web3');
import {testAccounts} from "../hardhat.config";

//Referencias: 
//https://docs.openzeppelin.com/learn/deploying-and-interacting


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
    const [admin, citizen1] = await ethers.getSigners();

    // Load contract already deployed in the subnet
    const address = '0xa1E47689f396fED7d18D797d9D31D727d2c0d483'; // Deployed contract address
    var stFactory = await ethers.getContractFactory('AccessControl'); // Interface
    stFactory = stFactory.connect(admin); // change the user who sign the transactionn
    const sc = await stFactory.attach(address);
    
    // Use the contract loaded
    //await sc.addAcademicInstitution(admin.address);
    console.log(await sc.getInstitution(0));
    console.log(await sc.getInstitution(1));
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
