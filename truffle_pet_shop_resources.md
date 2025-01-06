https://next-stack.github.io/boxes/pet-shop

https://github.com/Hsien-HsiuLiao/truffle-pet-shop-box

https://archive.trufflesuite.com/boxes/pet-shop/

https://archive.trufflesuite.com/guides/pet-shop/


https://archive.trufflesuite.com/guides/pet-shop/#directory-structure

Directory structure¶

The default Truffle directory structure contains the following:

    contracts/: Contains the Solidity source files for our smart contracts. There is an important contract in here called Migrations.sol, which we'll talk about later.
    migrations/: Truffle uses a migration system to handle smart contract deployments. A migration is an additional special smart contract that keeps track of changes.
    test/: Contains both JavaScript and Solidity tests for our smart contracts
    truffle-config.js: Truffle configuration file


https://archive.trufflesuite.com/guides/pet-shop/#testing-the-smart-contract-using-solidity

https://archive.trufflesuite.com/guides/pet-shop/#instantiating-the-contract

    $.getJSON('Adoption.json', function(data) {
    // Get the necessary contract artifact file and instantiate it with @truffle/contract
    var AdoptionArtifact = data;
    App.contracts.Adoption = TruffleContract(AdoptionArtifact);

    // Set the provider for our contract
    App.contracts.Adoption.setProvider(App.web3Provider);

    // Use our contract to retrieve and mark the adopted pets
    return App.markAdopted();
    });

https://archive.trufflesuite.com/guides/pet-shop/#installing-and-configuring-lite-server


Open bs-config.json in a text editor (in the project's root directory) and examine the contents:

    {
        "server": {
            "baseDir": ["./src", "./build/contracts"]
        }
    }

This tells lite-server which files to include in our base directory. We add the ./src directory for our website files and ./build/contracts directory for the contract artifacts.

https://archive.trufflesuite.com/docs/truffle/how-to/contracts/run-migrations/

https://archive.trufflesuite.com/guides/using-infura-custom-provider/
