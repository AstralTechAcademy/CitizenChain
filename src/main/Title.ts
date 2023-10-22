// test/Airdrop.js
// Load dependencies
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const Web3 = require('web3');
import {testAccounts} from "../hardhat.config";
import { smartContracts } from "./Constants";

//Referencias: 
//https://docs.openzeppelin.com/learn/deploying-and-interacting

const main = async(): Promise<any> => {

    // Load hardhat.config.ts addresses
    const [admin, citizen1, upm, uoc, uam, telecomunication, computerScience, architecture] = await ethers.getSigners();

    // Load contract already deployed in the subnet
    var stFactory = await ethers.getContractFactory('TitleRegistry'); // Interface
    stFactory = stFactory.connect(upm); // change the user who sign the transactionn
    const sc = await stFactory.attach(smartContracts.TITLE);

    try
    {
      await sc.emitTitle(536, upm.address, telecomunication.address, citizen1.address, 2019);
    } 
    catch
    {
      console.log("Title already exist");
    }

    await new Promise(f => setTimeout(f, 2000));
    
    console.log(await sc.count1());
    console.log(await sc.getTitle(536));
    console.log(await sc.getTitlesByStudent(citizen1.address));
    await sc.cancelTitle(536);
    var titles = await sc.getTitlesByStudent(citizen1.address);
    for (var title of titles) {
      console.log(await sc.getTitle(title));
    }

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
