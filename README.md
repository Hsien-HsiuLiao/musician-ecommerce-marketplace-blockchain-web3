# Final project for the ConsenSys Developer Program
### Intro

This is a decentralized application where a visitor using a broswer with the MetaMask extension can purchase songs for sale with Ethereum cryptocurrency. The songs are listed for sale by the band manager who manages the artist/songs. The app admin is the only one that can that add band managers via their Ethereum account address. Once added, the band managers can then add songs for sale to the site. Visitors can visit the site and purchase songs in Ether which is sent directly to the band manager who submitted the song.  

Project has been migrated to use HardHat https://hardhat.org/tutorial

        
       
### Accounts:
#### Admin - Adds band managers by account address, can see a list of current band managers
#### Band manager - Can add songs for sale
#### Visitor - Anyone with an ethereum account can purchase listed songs for sale
##### (future functionality): a song list will be created and linked to the visitor account to view songs that they purchased, band managers will be able to also add band members and they will have a say in how sales profits are divided

### Libraries used:
SafeMath no longer needed for solidity 0.8.0

~~SafeMath library from OpenZeppelin was used and imported in BandApp.sol~~

## MetaMask setup
Select the “Add Network” button and you will be greeted with a form requesting for the relevant network details. In order to connect to our local network, we will be using the following:

    Network Name: Hardhat— This is up to you and defines how the network will show up in your network dropdown.
    New RPC URL: http://127.0.0.1:8545/ — The endpoint returned from running npx hardhat node earlier.
    Chain ID: 31337 — This is the default chain identifier that is implemented by Hardhat. You can refer to their documentation here.
    Currency Symbol: HardhatETH — This is up to you and defines the symbol for the local network currency (ie. ETH).

## How to set up for local development/testing

Clone the repository

To install ~~lite-server~~ and other dependencies, run in root dir and frontend dir

    npm install
    
Run a local blockchain
    
   

Open a browser (Chrome preferred) with the Metamask extension installed 



In the project directory, run in a separate terminal window: 
    
    npx hardhat compile

then

    npx hardhat node

you will see list of accounts for testing

    Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

    Accounts
    ========

    WARNING: These accounts, and their private keys, are publicly known.
    Any funds sent to them on Mainnet or any other live network WILL BE LOST.

    Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)........

import Account 0 private key from hardhat into MetaMask

then in another terminal

    npx hardhat run scripts/deploy.js --network localhost

and you should see in the hardhat node terminal


    eth_accounts
    eth_sendTransaction
    Contract deployment: BandApp
    Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3
    Transaction:         0x239e12b720ab76accccbc15ac8553ac32307f28b3aebb39d120d22e61f794e56
    From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
    Value:               0 ETH
    Gas used:            865449 of 2310334
    Block #1:            0x17bbe170784456b089c81bf149ae0500864013eb3d014cadd53c9a05bc9f2b0e

    eth_getTransactionReceipt




next, to run the app, cd to frontend dir

    npm start

then you will see in the hardhat node terminal

    eth_accounts
    eth_call
    Contract call:       BandApp#owner
    From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
    To:                  0x5fbdb2315678afecb367f032d93f642f64180aa3

    eth_getBlockByNumber
    eth_getBalance (2)
    eth_call
    Contract call:       BandApp#songIndex
    From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
    To:                  0x5fbdb2315678afecb367f032d93f642f64180aa3

    eth_call
    Contract call:       BandApp#bandMgrIndex
    From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
    To:                  0x5fbdb2315678afecb367f032d93f642f64180aa3

    eth_blockNumber (7)
    eth_getBalance (3)
    eth_blockNumber (30)

The app should now be running in the browser. If not, browse to http://localhost:3000/ The first account is set as the admin account, and you will be able to add a band manager from here. For testing, we will use Account 2 to copy the address and input it as a band manager. After submitting the address, the list of band managers will be updated in the Admin panel. And if you switch to Account 2 in Metamask, you will now see a Band Manager panel. Next add a song by inputting a name and price in ether. (Ex: Thriller, 0.07) Now switch to Account 3 (this will be used as a visitor account with no special priviliges). You will now see the song for sale and you can purchase it by clicking the BUY button. Notice the account balances of Account 2 and 3 before and after purchasing the song. Screenshots on how to setup the app are available at the end.



## Testing
test template from web3 github, https://github.com/Hsien-HsiuLiao/create-hardhat-web3v4/tree/create-hardhat-web3v1

 In the project directory, run in a new terminal window:

    
    npx hardhat test

 

## Circuit breaker (emergency stop) pattern
On the Admin panel of the app, there is an 'Emergency Stop' button. Once this is pressed, songs can no longer be purchased. The first account in MetaMask is set as the admin.

## Design patterns
[design_pattern_desicions.md](..//master/design_pattern_desicions.md)

## Common attacks
[avoiding_common_attacks.md](..//master/avoiding_common_attacks.md)


### Future implementations:

   Implement an upgradable design pattern
   
   Write a smart contract in LLL or Vyper

IPFS -   Users can dynamically upload documents to IPFS that are referenced via their smart contract

uPort

Ethereum Name Service -   A name registered on the ENS resolves to the contract, verifiable on rinkeby.etherscan.io/contract_name

Oracle

~~Use UjoMusic API for sample songs for sale https://api.ujomusic.com/api/musicreleases~~ use audius https://docs.audius.org/developers/introduction/overview/

implement e-commerce https://www.youtube.com/watch?v=wPQ1-33teR4

implement multi sig wallet for payments (all or majority of band members agree on profit split?)



update tests


# Troubleshooting

error: Received invalid block tag 3. Latest block number is 1

https://stackoverflow.com/questions/75125299/how-to-stop-a-hardhat-node-running-on-localhost

close vscode terminal that was running hardhat node to ensure process is stopped

error: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.

- make sure you are using local network for local development

- clear Metamask cache/tab data in Settings->Advanced