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
/***********************************
 * Create test addresses           *
 **********************************/

  // Institutions
  var mnemonic = "sausage shadow board sell skill year radio ill fun grunt select sample invite setup level stick lumber worth creek amount example federal mask until"
  var upm = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "green broccoli net drama harsh enemy luggage system market sting identify profit love base write feature symptom balance favorite portion tourist sheriff element broccoli"
  var uoc = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "hospital tower champion spoon dumb enforce lake assist hole zoo survey inch cloth clarify sting lift arrow eight cage expose worth install whisper bonus"
  var uam = ethers.Wallet.fromMnemonic(mnemonic)

  // Titles
  mnemonic = "derive slender board column nest forward tennis wool collect debate thrive copper theory color sun glimpse body weasel unit light furnace climb glory crash"
  var telecomunication = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "render amateur narrow bench raven put when bless scrap mesh blade drama pattern foster lunar gaze child valley pave skin fun slim inhale junk"
  var computerScience = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "lawsuit minor mother rebuild stereo topic text stick vibrant couch learn assume law cute jazz apple poverty deputy gap fantasy day lend man symptom"
  var aerospacial = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "young come giggle essay document favorite top apart because load result lawn betray frame tool grain beyond fabric fiction spring walnut number pyramid mirror"
  var civil = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "tissue weapon twist domain taste female depart forest uncle fringe retreat broccoli mobile reopen feed enforce vivid drill current lock desk abandon gossip until"
  var architecture = ethers.Wallet.fromMnemonic(mnemonic)

  console.log("---------------------------------------------------")
  console.log("- Claves privadas de las instituciones y escuelas -")
  console.log("---------------------------------------------------\n")
  console.log(" UPM: " + upm.privateKey)
  console.log(" UOC: " + uoc.privateKey)
  console.log(" UAM: " + uam.privateKey)
  console.log("\n")
  console.log(" Teleco: " + telecomunication.privateKey)
  console.log(" Computer science: " + computerScience.privateKey)
  console.log(" Aerospacial: " + aerospacial.privateKey)
  console.log(" Civil: " + civil.privateKey)
  console.log(" Architecture: " + architecture.privateKey)
  console.log("\n---------------------------------------------------")

  // Transfer funds
  const tx = {
    to: upm.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const tx1 = {
    to: uoc.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const tx2 = {
    to: uam.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const [admin] = await ethers.getSigners();
  
  await admin.sendTransaction(tx);
  await admin.sendTransaction(tx1);
  await admin.sendTransaction(tx2);

  await new Promise(f => setTimeout(f, 2000));

  console.log(await ethers.provider.getBalance(admin.address));
  console.log(await ethers.provider.getBalance(upm.address));
  console.log(await ethers.provider.getBalance(uoc.address));
  console.log(await ethers.provider.getBalance(uam.address));

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
