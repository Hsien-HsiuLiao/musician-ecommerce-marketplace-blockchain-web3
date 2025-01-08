const fs = require('fs');
const path = require("path");
require("@nomiclabs/hardhat-web3");

//https://stackoverflow.com/questions/77071456/typeerror-web3-is-not-a-constructor
//for web3(v1.x) or older:

const Web3 = require('web3');

const web3 = new Web3('ws://localhost:8545');

//@type import artifacts from "../artifacts/contracts/Lock.sol/Lock.json";
const artifacts = require("../artifacts/contracts/BandApp.sol/BandApp.json");

async function main() {

  console.log('this script is using hardhat-web3');

  const [deployer] = await web3.eth.getAccounts();

  //https://docs.web3js.org/guides/migration_from_other_libs/#contracts-deployment
/* const contractObject = new web3.eth.Contract(abi);
const deployedContract = await contractObject
	.deploy({
		data: bytecode,
		arguments: ['constructor param'],
	})
	.send({
		from: '0x12598d2Fd88B420ED571beFDA8dD112624B5E730',
		gas: '1000000',
		// other transaction's params
	});

console.log('contract address', deployedContract.options.address); */

  const bandAppContract = new web3.eth.Contract(artifacts.abi);
  const rawContract = await bandAppContract.deploy({
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

  const contractsDir = path.join(__dirname, "..", "frontend-web3js-dapp-ts", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }


  fs.writeFileSync(
    path.join(contractsDir, "MusicianDAppweb3.json"), 
    JSON.stringify(data)
  );

  console.log(data);

  //https://github.com/NomicFoundation/hardhat-boilerplate/blob/master/scripts/deploy.js
  //todo
  // We also save the contract's artifacts and address in the frontend directory
  //saveFrontendFiles(contract);
}

function saveFrontendFiles(contract) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});