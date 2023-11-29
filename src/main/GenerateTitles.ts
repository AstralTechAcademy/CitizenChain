// test/Airdrop.js
// Load dependencies
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5MTI0NmQ5ZS1mZjQ3LTQxMDEtYmI3OS1hY2M3OTQzNWI3ZDQiLCJlbWFpbCI6ImdhYnJpZGc5NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiODhmNTM4MTg1ODczNDg3NjEwOTAiLCJzY29wZWRLZXlTZWNyZXQiOiI2ODU5MWJmZDY5NDU2NDI4NjcxOWIzOGU1NGZiZTFkOGUwNjk1OTI5YjY0NjFjMjAxMjc1ZDM5OWE1OGRmOWQ3IiwiaWF0IjoxNzAxMTk0MzMzfQ.9rgK6bEL9E95QcKgaTPIk3LRNVCvqf_RMSt2QfPlM08'});

import * as fs from 'fs/promises';
import * as path from 'path';
import { promisify } from 'util';

const sleep = promisify(setTimeout);

function getUnixTimestamp(): number {
  return Math.floor(Date.now() / 1000); // Dividir por 1000 para convertir de milisegundos a segundos
}


async function generateMetadata(srcDir: string, destDir: string, hash: string): Promise<void> {

  try {
    const files = await fs.readdir(srcDir);

    for (const file of files) 
    {
        const srcPath = path.join(srcDir, file);
        const fileExtension = path.extname(file);
        const destFileName = path.parse(file).name;
        const destPath = path.join(destDir, destFileName);

        const metadata = {
          name: destFileName,
          tokenId: Number(destFileName), // Incluir el valor adecuado para tokenId
          image: 'https://jade-negative-emu-951.mypinata.cloud/ipfs/' + hash + "/" + destFileName + fileExtension, // Incluir el valor adecuado para image
          description: 'Title ID: ' + destFileName,
          attributes: ['UPM'],
        };

      await fs.writeFile(destPath, JSON.stringify(metadata, null, 2));
      console.log(`Generated metadata for ${destFileName} and saved to ${destPath}`);
 
    } 
  }
  catch (error) {
    console.error('Error copying files:', error);
  }

}

async function copyFiles(srcDir: string, destDir: string): Promise<void> {
  try {
    const files = await fs.readdir(srcDir);

    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const timestamp = getUnixTimestamp();
      const fileExtension = path.extname(file);
      const destFileName = `${timestamp}${fileExtension}`;
      const destPath = path.join(destDir, destFileName);

      if (file.startsWith('.')) {
        continue;
      }

      await fs.copyFile(srcPath, destPath);
      console.log(`Copied ${file} to ${destFileName}`);
      // Esperar 1 segundo antes de la siguiente copia
      await sleep(1000);
    }

    console.log('All files copied successfully.');
  } catch (error) {
    console.error('Error copying files:', error);
  }
}




const main = async(): Promise<any> => {
  const res1 = await pinata.testAuthentication()
  console.log(res1)


  const sourceDirectory = './nfts/';
  const destinationDirectory = './titles/';

  await copyFiles(sourceDirectory, destinationDirectory);

const options = {};
const res = await pinata.pinFromFS('./titles/', options)
console.log(res["IpfsHash"])

await generateMetadata("./titles/", "./metadata/", res["IpfsHash"]);

const res2 = await pinata.pinFromFS('./metadata/', options)
console.log(res2)

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
