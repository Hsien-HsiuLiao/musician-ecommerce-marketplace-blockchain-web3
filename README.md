Inspired by Imogen Heap's innovative project "Mycelia" and Matt Sorum's "Artbit" in 2018, I began to delve into the potential of blockchain technology to revolutionize the music industry. Both of these initiatives highlight the need for a more equitable and transparent system for artists, and blockchain offers a promising solution.

Decentralization and Ownership

At the core of blockchain technology is decentralization, which empowers musicians by allowing them to maintain ownership of their work. Traditionally, artists often find themselves at the mercy of record labels and streaming platforms that control distribution and revenue. With blockchain, musicians can directly manage their intellectual property, ensuring they receive fair compensation for their creations. Smart contracts can automate royalty payments, ensuring that artists are paid immediately and transparently whenever their music is streamed or sold.

Enhanced Transparency

One of the significant challenges in the music industry is the lack of transparency regarding how royalties are calculated and distributed. Blockchain's immutable ledger provides a clear and verifiable record of all transactions, allowing artists to track their earnings and understand how their music is being monetized. This transparency can help build trust between artists and their fans, as listeners can see how their support translates into financial support for the musicians they love.

New Revenue Streams

Blockchain technology also opens up new avenues for revenue generation. For instance, musicians can create and sell non-fungible tokens (NFTs) representing unique pieces of their work, such as exclusive tracks, concert tickets, or even virtual meet-and-greets. This not only provides artists with additional income but also fosters a deeper connection with their audience, as fans can own a piece of the artist's journey.

Community Engagement and Crowdfunding

Platforms built on blockchain can facilitate community engagement and crowdfunding in unprecedented ways. Artists can connect directly with their fans, allowing them to support projects before they are fully realized. This model not only provides financial backing but also creates a sense of community and shared ownership among fans and artists. By involving fans in the creative process, musicians can cultivate a loyal following that feels invested in their success.

Challenges and Considerations

While the potential benefits of blockchain for musicians are significant, there are also challenges to consider. The technology is still relatively new, and many artists may lack the technical knowledge to navigate it effectively. Additionally, the environmental impact of blockchain, particularly in terms of energy consumption, raises concerns that need to be addressed. As the industry evolves, it will be crucial to find sustainable solutions that balance innovation with responsibility.

## ConsenSys Developer Program
I researched and came across the ConsenSys Developer Program. It was designed to educate and empower developers to build decentralized applications (dApps) on the Ethereum blockchain. ConsenSys, a leading blockchain technology company, aimed to foster a community of skilled developers who could contribute to the growing ecosystem of Ethereum-based projects. I applied and received a scholarship to participate in this program. 

### Exercises
https://github.com/Hsien-HsiuLiao/simple-bank-exercise

https://github.com/Hsien-HsiuLiao/event-ticket-exercise

https://github.com/Hsien-HsiuLiao/multisig-wallet-exercise

https://github.com/Hsien-HsiuLiao/proof-of-existence-exercise

https://github.com/Hsien-HsiuLiao/simple-bank-vyper

https://github.com/Hsien-HsiuLiao/supply-chain-exercise

https://github.com/Hsien-HsiuLiao/ethereum-address-generator-js

### Final project
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

https://support.metamask.io/more-web3/learn/what-is-infura-and-why-does-metamask-use-it/

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
- https://docs.audius.org/api/
- https://audius.org/api/
- https://docs.audius.org/developers/introduction/overview/
- https://audiusproject.github.io/api-docs/#audius-api-docs
- https://docs.audius.org/
- https://blog.audius.co/article/free-audius-music-plug-in-for-unreal-engine-now-available

implement e-commerce https://www.youtube.com/watch?v=wPQ1-33teR4

implement multi sig wallet for payments (all or majority of band members agree on profit split?)



update tests


# Events

- attended Capitol Royale 2018, 2019
- attended A3E workshops on blockchain and music industry 2019 https://a3exchange.info/anaheim_2019.html , 2020 https://a3exchange.info/anaheim_2020.html

# Music on blockchain
- https://near.org/blog/music-and-blockchain-introducing-the-future-of-sound
- https://dappradar.com/blog/music-on-blockchain-dappradars-ultimate-guide
- https://builtin.com/blockchain/blockchain-music-innovation-examples
- https://www.sound.xyz/
- https://builtin.com/blockchain/nft-music
- https://loudwire.com/matt-sorum-to-artists-help-is-on-the-way-with-artbit/
- https://blog.ujomusic.com/
- http://myceliaformusic.org/
- http://www.capitolmusic360.com/2018/06/26/extend-powers-capitol-360-hackathon-at-legendary-recording-studios/
- https://decrypt.co/99029/yellowheart-is-transforming-how-tickets-are-issued-sold-and-exchanged
- https://yh.io/
- 
