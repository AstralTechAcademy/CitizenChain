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
  var funcionario = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "green broccoli net drama harsh enemy luggage system market sting identify profit love base write feature symptom balance favorite portion tourist sheriff element broccoli"
  var director = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "hospital tower champion spoon dumb enforce lake assist hole zoo survey inch cloth clarify sting lift arrow eight cage expose worth install whisper bonus"
  var uam = ethers.Wallet.fromMnemonic(mnemonic)

  // Degrees
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

  // People
  mnemonic = "half flash equip rifle city print shoulder all chest song doctor rail pledge live until noise feature alcohol actress spell spoon expand town tonight"
  var doctor1 = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "govern miracle grief history warrior almost material brain stumble trash measure follow love blast title long obscure atom despair history rotate cannon only snack"
  var pharmacist1 = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "decorate vicious fire misery width toddler midnight table usual knock convince tragic identify leave matrix claw horn vendor april monitor spin soul engage salt"
  var patient1 = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "prevent impose hero skill gold index animal hotel sugar jump shove sun inflict gold promote flower theory uphold unknown gaze sword asset disagree teach"
  var healtMinistry = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "thrive honey describe tent present know tuition whip lock smoke fish client either duty invite marriage bean lion rule physical move upper crew sorry"
  var student1 = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "alone dignity exhaust cannon night museum material stomach enforce make fan struggle code glory chapter solve notable artwork kidney unfair still proud stove assume"
  var student2 = ethers.Wallet.fromMnemonic(mnemonic)
  // Labs
  mnemonic = "version drop seat blush wood keep average load protect grab once hammer toward vapor voice pyramid hurt fox alcohol aunt pulp fan network market"
  var ownerBayer = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "legal inject devote slam undo process relax multiply finish brave awkward garment edit raven shoe fork sail cheese still feel birth keen flame gentle"
  var ownerPfizer = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "fun shadow train sting useless toddler pioneer dove fun mirror ghost attitude quarter height load saddle final afraid capable cruel pass order hip supply"
  var ownerGrifols = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "vendor dish before fog grocery flush lake erupt royal rival clutch wood pact member volcano resemble grow moral crouch test grit zebra control twenty"
  var bayer = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "tumble common maple green math shoe slice actor shaft beef repeat waste shiver observe enemy slender cat funny seek velvet deny gadget success setup"
  var pfizer = ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = "rude rib sight easy medal arm emotion square any genuine snap quantum bullet sauce insect region leader swamp layer common crime able mandate absent"
  var grifols = ethers.Wallet.fromMnemonic(mnemonic)

  console.log("---------------------------------------------------")
  console.log("- Claves privadas de las instituciones y escuelas -")
  console.log("---------------------------------------------------\n")
  console.log(" Funcionario: " + funcionario.privateKey)
  console.log(" Director: " + director.privateKey)
  console.log(" UAM: " + uam.privateKey)
  console.log("\n")
  console.log(" Teleco: " + telecomunication.privateKey)
  console.log(" Computer science: " + computerScience.privateKey)
  console.log(" Aerospacial: " + aerospacial.privateKey)
  console.log(" Civil: " + civil.privateKey)
  console.log(" Architecture: " + architecture.privateKey)
  console.log("\n---------------------------------------------------")

  console.log("---------------------------------------------------")
  console.log("- Claves privadas de personas -")
  console.log("---------------------------------------------------\n")
  console.log(" Doctor1: " + doctor1.privateKey)
  console.log(" Pharmacist1: " + pharmacist1.privateKey)
  console.log(" Patient1 : " + patient1.privateKey)
  console.log(" Student1 : " + student1.privateKey)
  console.log(" Student2 : " + student2.privateKey)
  console.log(" HealtMinistry : " + healtMinistry.privateKey)
  console.log("\n---------------------------------------------------")

  console.log("---------------------------------------------------")
  console.log("- Claves privadas de labs -")
  console.log("---------------------------------------------------\n")
  console.log(" Owner Bayer: " + ownerBayer.privateKey)
  console.log(" Owner Pfizer: " + ownerPfizer.privateKey)
  console.log(" Owner Grifols : " + ownerGrifols.privateKey)
  console.log(" Bayer : " + bayer.privateKey)
  console.log(" Pfizer : " + pfizer.privateKey)
  console.log(" Grifols : " + grifols.privateKey)
  console.log("\n---------------------------------------------------")

  const [admin] = await ethers.getSigners();

  // Transfer funds
  const tx = {
    to: funcionario.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const tx1 = {
    to: director.address,
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

  const tx3 = {
    to: doctor1.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const tx4 = {
    to: pharmacist1.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const tx5 = {
    to: healtMinistry.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const tx6 = {
    to: ownerBayer.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const tx7 = {
    to: ownerPfizer.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const tx8 = {
    to: ownerGrifols.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const tx9 = {
    to: bayer.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const tx10 = {
    to: pfizer.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const tx11 = {
    to: grifols.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }

  const tx12 = {
    to: student1.address,
    value: ethers.utils.parseEther("20000"),
    gasLimit: 21000,
    gasPrice: "0x5D21DBA00",
    chainId: 4543,
  }
  
  await admin.sendTransaction(tx);
  await admin.sendTransaction(tx1);
  await admin.sendTransaction(tx2);
  await admin.sendTransaction(tx3);
  await admin.sendTransaction(tx4);
  await admin.sendTransaction(tx5);
  await admin.sendTransaction(tx6);
  await admin.sendTransaction(tx7);
  await admin.sendTransaction(tx8);
  await admin.sendTransaction(tx9);
  await admin.sendTransaction(tx10);
  await admin.sendTransaction(tx11);
  await admin.sendTransaction(tx12);


  await new Promise(f => setTimeout(f, 2000));

  console.log(await ethers.provider.getBalance(admin.address));
  console.log(await ethers.provider.getBalance(director.address));
  console.log(await ethers.provider.getBalance(funcionario.address));
  console.log(await ethers.provider.getBalance(director.address));
  console.log(await ethers.provider.getBalance(uam.address));
  console.log(await ethers.provider.getBalance(doctor1.address));
  console.log(await ethers.provider.getBalance(pharmacist1.address));
  console.log(await ethers.provider.getBalance(healtMinistry.address));

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
