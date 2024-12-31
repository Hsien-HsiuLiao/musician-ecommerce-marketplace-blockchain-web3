const fs = require('fs');
require("@nomiclabs/hardhat-web3");

//https://stackoverflow.com/questions/77071456/typeerror-web3-is-not-a-constructor
//for web3(v1.x) or older:

const Web3 = require('web3');

const web3 = new Web3('ws://localhost:8545');

//@type import artifacts from "../artifacts/contracts/Lock.sol/Lock.json";
const artifacts = require("../artifacts/contracts/BandApp.sol/BandApp.json");

async function main() {

  console.log('this script is using hardhat-web3');
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = web3.utils.toWei("0.001", 'ether');

  const [deployer] = await web3.eth.getAccounts();
  
  const daoContract = new web3.eth.Contract(artifacts.abi);
  const rawContract = await daoContract.deploy({
    data: artifacts.bytecode,
    arguments: [],
    //https://ethereum.stackexchange.com/questions/50554/deploying-a-contract-with-web3-js
//https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html
  }).send({
    from: deployer, 
    gasPrice: '10000000000', gas: 2310334
   });

console.log(`BandApp address: ${rawContract.options.address}`);

  const data = {
    //https://web3js.readthedocs.io/en/v1.3.0/web3-eth-contract.html?highlight=address#id16
    address: rawContract.options.address,
    //https://web3js.readthedocs.io/en/v1.3.0/web3-eth-contract.html?highlight=address#options-jsoninterface
   abi: /* JSON.parse( */rawContract.options.jsonInterface/* .format('json') )*/
 ///abi: JSON.parse(rawContract)
  };

  
  fs.writeFileSync('BandAppweb3.json', JSON.stringify(data)); 

  console.log(data);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});