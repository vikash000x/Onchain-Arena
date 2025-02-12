import { ethers } from 'hardhat';


const metadataURI = "https://gateway.pinata.cloud/ipfs/QmX2ubhtBPtYw75Wrpv6HLb1fhbJqxrnbhDo1RViW3oVoi";
async function deploy(name: string, ...params: [string]) {
    const contractFactory = await ethers.getContractFactory(name);
  
    return await contractFactory.deploy(...params).then((f) => f.waitForDeployment());
  }
  
  async function main() {
    const [admin] = await ethers.getSigners();
    
    console.log(`Deploying a smart contract...`);
  
    const AVAXGods = (await deploy('AVAXGods', metadataURI)).connect(admin); ;

  
    console.log({ AVAXGods: await AVAXGods.getAddress() });

  }
  

  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  });