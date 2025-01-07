import React from 'react';
import { useState, useEffect } from 'react';


function AdminPanel({contract, accounts}) {
    const [status, setStatus] = useState('typing');
    const [BandMgrAcctAddress, setBandMgrAcctAddress] = useState('');
    const [numOfMgrs, setnumOfMgrs] = useState('0');
    const [error, setError] = useState(null);

    useEffect(() => {
        const init = async () => {
            showCurrentMgrs()
        }
        init();
    
      }, []);

    function handleTextareaChange(e) {
        setBandMgrAcctAddress(e.target.value);
      }

    async function showCurrentMgrs() {
        /* var numOfMgrs = 0;
        var inumOfMgrs = 0;
        $("#currentMgrs").show();
        // display bandmgrindex, how many band managers?
        App.contracts.BandApp.deployed().then(function (app) {
          return app.bandMgrIndex();
        }).then(function (index) {
          numOfMgrs = index;
          //console.log("app.bandMgrIndex on the blockchain is " + index);
          $("#currentMgrs").html("<p>Current number of band managers:" + numOfMgrs);
        }).then(function () {
          for (i = 0; i < numOfMgrs; i++) {
            App.contracts.BandApp.deployed().then(function (app) {
              //console.log(inumOfMgrs);
              inumOfMgrs++;
              return app.bandMgrs(inumOfMgrs - 1);
            }).then(function (acct) {
              $("#currentMgrs").append("Band Manager account address(es)<p>" + acct + "," + inumOfMgrs);
              //inumOfMgrs++;
            });
          }
        }); */
    
        const numOfMgrs = await contract.methods.bandMgrIndex().call();
        console.log("numOfMgrs", numOfMgrs);
        setnumOfMgrs(numOfMgrs);
    
    
      }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        try {
          //call submitMgr
    
    
          /* 
          this initializes inputAddress and sets it to BandMgrAcctAddress
          then clears html element
          var inputAddress = '0x0';
          inputAddress = document.getElementById('BandMgrAcctAddress');
          App.BandMgrAcct=inputAddress.value;
          document.getElementById('BandMgrAcctAddress').value=''; */
    
          //bmaIndex++;
          //check if acct already submitted
    
          //App.BandMgrAcct = parseInt("0x"+ inputAddress);
          //$("#outputAddress").html("address entered:"+App.BandMgrAcct);
          // store address in account on blockchain
          /*  
          call contract.addMgr with bandmgracct address, must be admin/owner
          then showCurrentMgrs if react does not refresh
     
          App.contracts.BandApp.deployed().then(function(app){
             return app.addMgr(App.BandMgrAcct, {from: App.adminAcct});
           }).catch(function(err){
             console.log(err);
             }).then(function(){
               showCurrentMgrs();
             }) */
    
          await contract.methods.addMgr(BandMgrAcctAddress).send({ from: accounts[0] });
          console.log('band mgr added', await contract.methods.bandMgrs(0).call());
          showCurrentMgrs();
    
          /*  App.contracts.BandApp.deployed().then(function(app){
             //console.log("app.bandmgrindex=" + JSON.stringify(app.bandMgrIndex()));
             //console.log("app.bandMgrs(0) before returning and chaining then:" 
             //+ JSON.stringify(app.bandMgrs(0)));
             return app.bandMgrs(0);
             }).then(function(acct){
               console.log("app.bandMgrs(0) on the blockchain is " + acct)
               }) */
    
          /* // display bandmgrindex, how many band managers?
          App.contracts.BandApp.deployed().then(function(app){
            return app.bandMgrIndex();
            }).then(function(index){
              console.log("app.bandMgrIndex on the blockchain is " + index)
              })       */
    
    
          //      await submitForm(answer);
          /* telephoneCheck(answer);
          console.log('telephoneCheck(answer)', telephoneCheck(answer));
          if (telephoneCheck(answer) === true) {
    
            setStatus('success');
          }
          if (telephoneCheck(answer) === false) {
            setError(false);
          } */
        } catch (err) {
          setStatus('typing');
          setError(err);
        }
      }

    return (
        <div>
        <div id="adminpanel">
              {/* <input type="text" id="BandMgrAcctAddress" placeholder="input band mgr account address" ></input>
              <button id="submitMgr" type="submit" class="btn  btn-primary">submit</button> */}
              AdminPanel<br />
              Admin, input band mgr account address
              <form onSubmit={handleSubmit}>
                <textarea
                  value={BandMgrAcctAddress}
                  onChange={handleTextareaChange}
                  disabled={status === 'submitting'}
                />
                <br />
                <button disabled={
                  BandMgrAcctAddress.length === 0 ||
                  status === 'submitting'
                }>
                  Submit
                </button>
                {error !== null &&
                  <p className="Error">
                    {error.message}
                  </p>
                }
              </form>
            </div>
             {/* <currentMgrs component */}
            <div id="currentMgrs">Current number of band managers: {numOfMgrs}</div>
            {/* currentMgrs component />*/}
           
           </div>
    );
}


export default AdminPanel;