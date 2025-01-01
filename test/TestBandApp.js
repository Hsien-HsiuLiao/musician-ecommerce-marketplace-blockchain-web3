//need to install , npm install --save-dev @nomiclabs/hardhat-web3 chai@4.3.6
//also add require("@nomiclabs/hardhat-web3"); to hardhat.config.js
// use chai@4.3.6
require("@nomiclabs/hardhat-web3");
const { expect } = require("chai");

//first get contract artifact
//get artifacts object 
const artifacts = require("../artifacts/contracts/BandApp.sol/BandApp.json");

//const BandApp = artifacts.require("BandApp");
const BandApp = new web3.eth.Contract(artifacts.abi);

//replace contract keyword with describe
//contract('SimpleSmartContract', () => {

describe("BandApp tests", accounts => {
    it('should increase bandMgrIndex by 1 when calling addMgr function', async () => {
        //get deployer account
        const [deployer, bandMgrAddress] = await web3.eth.getAccounts();
    
        //get pointer to contract instance
        //const simpleStorage = await SimpleStorage.deployed();
        const rawContract = await BandApp.deploy({
                data: artifacts.bytecode,
                arguments: [],
            }).send({
          from: deployer, 
          gasPrice: '10000000000', gas: 2310334
         });
       // await simpleStorage.set('this');
      // console.log(rawContract.methods.get().call());
    
      //https://docs.web3js.org/guides/hardhat_tutorial/#compile-test-and-deploy-the-contract
      // To change the status of the data we previously saved, we have to access the method container for the function (s) 
      //we desire and invoke the .send to broadcast our intention to the network , .send({from: deployer}).
        await rawContract.methods.addMgr(bandMgrAddress);
    
       // const result = await simpleStorage.get();
        const result = await rawContract.methods.bandMgrIndex().call();
        console.log('result',result);
    
        //assert(result, 'this');
        expect(result).to.equal(1);
      });

    //1. tests counter increase in addMgr functions
    //get value of bandmgrindex
    //call addMgr function
    // bandmgrindex should be increasd by 1 after calling addMgr
    it("should increase bandMgrIndex by 1 when calling addMgr function", () => {
        let indexBefore;
        let indexAfter;
        let contract;
        return BandApp.deployed()
        .then(instance => {
            contract = instance;
            return instance.bandMgrIndex();
        })
        .then(result => {
            indexBefore = result.toNumber();    
        })
        .then( () => {
            contract.addMgr(accounts[1]);
        })
        .then( () => {
            return contract.bandMgrIndex();
        })
        .then(newIndex => {
            indexAfter = newIndex.toNumber();        
        })
        .then( () => {
            assert.equal(indexBefore+1, indexAfter, "bandMgrIndex should have increased by 1")    
        })
    });

    //2. test addMgr, band mgr address added should match
    //get address added and compare to accounts[1]
    it("should add band manager account address when calling addMgr function", () => {
       
        let bandMgrAddress = accounts[1];
        let bandMgrAddressOnBlockchain;
        let index;
        let contract;
        return BandApp.deployed()
        .then(instance => {
            contract = instance;
            return instance.bandMgrIndex();
        })
        .then(result => {
            index = result.toNumber();    
        })
        .then( () => {
            return contract.addMgr(bandMgrAddress);
        })
        .then( () => {
            return contract.bandMgrs(index);
        })
        .then(result => {
            bandMgrAddressOnBlockchain = result;
         //   console.log(bandMgrAddressOnBlockchain);        
        })
        .then( () => {
            assert.equal(bandMgrAddress, bandMgrAddressOnBlockchain , "Band manager addresses should match")    
        })
    });

    // 3. test addSong function
    // add songname, price, and seller address to Song struct
    // input info should match what is stored in Struct
    it("should add a song named Beat It priced at 0.07 ether from accounts[1]", () => {
        let songname = "Beat It";
        let price = 0.07;
        let seller = accounts[1];
        let songIndexBefore;
        let songIndexAfter;

        return BandApp.deployed()
        .then(instance => {
            contract = instance;
            return contract.songIndex();
        }).then( index => {
            songIndexBefore = index.toNumber();
        }).then( () => {
            contract.addSong(songname, web3.toWei(price, "ether"),  {from: seller});
           
        }).then( () => {
            return contract.songIndex();
        }).then( index => {
            songIndexAfter = index.toNumber();
        })
        .then( () => {
            
            return contract.songs(0)
        }).then( song => {
            let convertedprice = web3.fromWei(song[1], "ether").toNumber();
            assert.equal(songname, song[0], "Song added should be Beat It");
            assert.equal(price, convertedprice, "Price should be 0.07 ether");
            assert.equal(accounts[1], song[2], "Address should match accounts[1]");
            assert.equal(songIndexBefore+1, songIndexAfter, "Number of songs should increase by 1")
        })
    });
    


    //4. test buySong function
    // perform song buying transaction, check balances of seller and buyer
    it("should transfer ether from the buyer's account to the seller(band manager)", () => {
        let seller = accounts[1];
        let buyer = accounts[2];
        const songPrice = 1;
        sellerBalanceBefore = web3.fromWei(web3.eth.getBalance(seller)).toNumber();
        buyerBalanceBefore = web3.fromWei(web3.eth.getBalance(buyer)).toNumber();
       
        let sellerBalanceAfter;
        let buyerBalanceAfter;

        return BandApp.deployed()
        .then(instance => {
            contract = instance;
        }).then( () => {
            return contract.buySong(seller, {from: buyer, value:web3.toWei(songPrice, "ether")});
        }).then( () => {
            sellerBalanceAfter = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1])).toNumber();
            buyerBalanceAfter = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[2])).toNumber();
           
        }).then( () => {
            assert.equal(sellerBalanceBefore + songPrice, sellerBalanceAfter, "seller's account should increase by song price");
            assert.isBelow(buyerBalanceAfter, buyerBalanceBefore - songPrice, "buyer's balance should decrease by song price plus gas transaction costs");

        })
    });

    //5. test circuit breaker function
    // get initial value of stopped variable
    // run circuitBreakerPressed function
    // verify that stopped variable has been updated
    it("should toggle variable when the circuitbreaker function is called", () => {
        let beforeButtonPress;
        let afterButtonPress;
        return BandApp.deployed()
        .then(instance => {
            contract = instance;

        }).then( () => {
            return contract.stopped();
        }).then( boolvalue => {
            beforeButtonPress = boolvalue;
         //   console.log(boolvalue)
            return contract.circuitBreakerPressed();
        }).then( () => {
            return contract.stopped();
        }).then( boolAfterPress => {
            afterButtonPress = boolAfterPress;
           // console.log(boolAfterPress);
        }).then( () => {
            assert.equal(beforeButtonPress, !afterButtonPress, "bool value should toggle")
        })
    });


})

