//import logo from './logo.svg';
import './App.css';
import Header from './Header.js';
import AdminPanel from './AdminPanel.js';
import AddSong from './AddSong.js';
import SongsForSale from './SongsForSale';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
//https://docs.web3js.org/guides/smart_contracts/smart_contracts_guide/#step-4-compile-the-solidity-code-with-the-solidity-compiler-and-get-its-abi-and-bytecode
//rename BandApp to contractABI?
import BandApp from '../contracts/MusicianDAppweb3.json';

function MusicianDApp() {
  //  https://react.dev/learn/reacting-to-input-with-state#step-2-determine-what-triggers-those-state-changes


  const [accounts, setAccounts] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState(undefined);


  useEffect(() => {
    const init = async () => {

      //from src/js/app.js return await App.initWeb3();

      //initweb3 should resolve /return web3 
      const web3 = await initWeb3();
      //const web3 = new Web3("ws://localhost:8545")
      setWeb3(web3);
      const contract = await initContract(web3);
      //await initContract();
      setContract(contract);

      const accounts = await web3.eth.getAccounts();
      // setAccounts(accounts);
      console.log('setAccounts');
      setAccounts(accounts);
      console.log('accounts', accounts);

      const admin = await contract
        .methods
        .owner()
        .call();


      console.log('owner of contract is ', admin);

      setAdmin(admin);

    }
    init();

    window.ethereum.on('accountsChanged', accounts => {
      setAccounts(accounts);
    });
  }, []);

  async function initWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
      console.log("modern dapp browser", window.ethereum);
      MusicianDApp.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      console.log("legacy dapp browser", window.web3);
      MusicianDApp.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      console.log('no injected web3 instance, fallback ganache')
      MusicianDApp.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    //web3 = new Web3(App.web3Provider);

    //setWeb3(new Web3(App.web3Provider));
    //console.log('setWeb3', App.web3Provider, web3)

    // initContract calls TruffleContract with contract json abi?
    //  return App.initContract();
    //initContract();

    return new Web3(MusicianDApp.web3Provider)
  }

  const isReady = () => {
    return (
      typeof contract !== 'undefined'
      && typeof web3 !== 'undefined'
      && typeof accounts !== 'undefined'
      //  && typeof admin !== 'undefined'
    );
  }

  if (!isReady()) {
    return <div>Loading...</div>;
  }

  function initContract(web3) {

    /* $.getJSON('BandApp.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var BandAppArtifact = data; */

    /*https://web3js.readthedocs.io/en/v1.2.11/include_package-core.html
    var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');
// or
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
 
// change provider
web3.setProvider('ws://localhost:8546'); */

    //original
    //App.contracts.BandApp = TruffleContract(BandAppArtifact);
    /*  App.contracts.BandApp = new Web3('http://localhost:8545');
 
     // Set the provider for our contract
     App.contracts.BandApp.setProvider(App.web3Provider);
   
   }); */


    const contract = new web3.eth.Contract(
      BandApp.abi,
      BandApp.address
    );
    console.log(contract);
    return contract;
  }

  function submitForm(BandMgrAcctAddress) {
    // Pretend it's hitting the network.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //    let shouldError = answer.toLowerCase() !== 'lima'
        /*  if (shouldError) {
           reject(new Error('Good guess but a wrong answer. Try again!'));
         } else {
           resolve();
         } */
      }, 1500);
    });
  }


  return (

    <div className="App">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-push-2">
            <Header accounts={accounts} contractAddress={BandApp.address} owner={admin} />

            {/* <AdminPanel component, this allows admin/owner to add band managers by eth address */}
            {/* and band managers can in turn add band members by eth address */}
            {/* admin panel only visible to admin/owner */}
            <AdminPanel contract={contract} accounts={accounts} />
            {/* AdminPanel component />*/}


{/* //App.BandMgrAcct = parseInt("0x"+ inputAddress);
          //$("#outputAddress").html("address entered:"+App.BandMgrAcct); */}
            <div id="outputAddress"></div>



            <div id="bandmgrpanel">add band members

            {/* <Add Song component */}
            <AddSong contract={contract} accounts={accounts} web3={web3}/>
              
            {/* Add Song component />*/}

            </div>
            <SongsForSale contract={contract} web3={web3}/>
            {/* <!--
                <div><button onclick="App.buyThisSong()">clickme</button></div>
                <div><button onclick="App.buyThisSong('test',7000,web3.eth.accounts[0])">buy test</button></div>
                --> */}
            <div id="testbuy"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicianDApp;
