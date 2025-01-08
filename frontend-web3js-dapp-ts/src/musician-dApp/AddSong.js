import React from 'react';
import { useState, useEffect } from 'react';


function AddSong({contract, accounts, web3}) {
    const [status, setStatus] = useState('typing');
    const [song, setSong] = useState('song name');
    const [price, setPrice] = useState('0');
    const [error, setError] = useState(null);

    useEffect(() => {
        const init = async () => {
        }
        init();
    
      }, []);

    function handleTextareaChange(e) {
        setSong(e.target.value);
      }

      function handlePriceareaChange(e) {
         setPrice(e.target.value);
       }

    

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        try {
                    //call submitSong

/* 
        let inputSong;
        let inputPrice;
        inputSong = document.getElementById('song');
        inputSong = inputSong.value;
        inputPrice = document.getElementById('price');
        inputPrice = inputPrice.value;
        alert(inputPrice); */

        /* 
        call addSong then showCurrentSongandPricelist

        App.contracts.BandApp.deployed().then(function(app){
          return app.addSong(inputSong, web3.toWei(inputPrice, "ether"), {from: web3.eth.accounts[0]});
        }).catch(function(err){
          console.log(err);
          }).then(function(){
            //showCurrentSongandPricelist();
          }) */
//https://web3js.readthedocs.io/en/v1.2.0/web3-utils.html#towei
//At Web3 version 1.0, utility functions like toWei and many others have been moved to the web3.utils. 
//https://ethereum.stackexchange.com/questions/48068/error-web3-towei-is-not-a-function

          await contract.methods.addSong(song, web3.utils.toWei(price, "ether")).send({ from: accounts[0] });
          console.log('song added', await contract.methods.songIndex().call());
     
        } catch (err) {
          setStatus('typing');
          setError(err);
        }
      }

    return (
        <div>
            <p>add song for sale</p>
               <input type="text" id="song" placeholder="song name"></input>
              <input type="number" id="price" placeholder="price in ETH"></input>
              <button id="submitSong" type="submit" class="btn  btn-primary">submit</button> 

              <form onSubmit={handleSubmit}>
                <textarea
                  value={song}
                  onChange={handleTextareaChange}
                  disabled={status === 'submitting'}
                />
                <textarea
                  value={price}
                  onChange={handlePriceareaChange}
                  disabled={status === 'submitting'}
                />
                <br />
                <button disabled={
                  song.length === 0 ||
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
    );
}


export default AddSong;