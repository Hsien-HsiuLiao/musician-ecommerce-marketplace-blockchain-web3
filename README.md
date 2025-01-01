# Final project for the ConsenSys Developer Program
### Intro

This is a decentralized application where a visitor using a broswer with the MetaMask extension can purchase songs for sale with Ethereum cryptocurrency. The songs are listed for sale by the band manager who manages the artist/songs. The app admin is the only one that can that add band managers via their Ethereum account address. Once added, the band managers can then add songs for sale to the site. Visitors can visit the site and purchase songs in Ether which is sent directly to the band manager who submitted the song.  

Project has been migrated to use HardHat https://hardhat.org/tutorial

~~Note: This project was developed using Truffle v4.1.14 (core: 4.1.14) Solidity v0.4.24 (solc-js)~~

~~truffle.js is specified to use solc version 0.4.24~~

        
       
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

To install lite-server and other dependencies, run

    $ npm install
    
Run a local blockchain
    
   

Open a browser (Chrome preferred) with the Metamask extension installed 

~~And import using the seed phrase generated by ganache-cli~~

import account 0 private key from hardhat

In the project directory, run in a separate terminal window: 

    
    npx hardhat compile
then

    
    npx hardhat node
then in another terminal

    npx hardhat run scripts/deploy.js --network localhost


next, to run the app, type

    $ npm run dev

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






# Screenshots on how to use the app
Open browser
![Step 1](screenshots/3.png "Open browser")
Click on Metamask, click on Import...
![alt text](screenshots/4.png "Click on Metamask, click on Import...")
A new tab may open, scroll down and click Import...
![alt text](screenshots/5.png "A new tab may open, scroll down and click Import...")
![alt text](screenshots/6.png "Paste seed phrase from ganache-cli, enter password and click")
![alt text](screenshots/7.png "Metamask may prompt with a Connect request")
![alt text](screenshots/8.png "The Band App loads and shows the admin panel")
![alt text](screenshots/9.png "Let's get an account address to input. Go to Metamask to switch to Account 2")
![alt text](screenshots/10.png "Select Account 2")
![alt text](screenshots/11.png "Select Account 2")
![alt text](screenshots/12.png "Once selected, you can click on the address to copy to the clipboard")
![alt text](screenshots/13.png "Paste the address into the input box. Pressing submit will update the band manager list")
![alt text](screenshots/14.png "Now if you switch to Account 2, you will see a band manager panel and you can add a song for sale")
![alt text](screenshots/15.png "Change to Account 3. This will serve as a visitor account. Notice the account balances")
![alt text](screenshots/16.png "You can now see a song for purchase. Click BUY")
![alt text](screenshots/17.png "You can see funds have been transferred from Account 3 to Account 2")



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

update front end to react

