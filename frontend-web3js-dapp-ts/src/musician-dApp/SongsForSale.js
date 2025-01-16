import React from 'react';
import { useState, useEffect } from 'react';


function SongsForSale({ contract, web3 }) {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const init = async () => {
            const numOfSongs = await contract.methods.songIndex().call();
            console.log("numOfSongs", numOfSongs);
            /* const songs = [
                { id: 1, songname: "beat it", price: "0.1" },
                { id: 2, songname: "mjane", price: "0.11" },
              ]; */
            var songs = [];

            for (var i = 0; i < numOfSongs; i++) {
                var song = await contract.methods.songs(i).call();
                songs.push(song);
            };

            setSongs(songs);
            console.log("songs[0]", songs[0])
            console.log("songs[1]", songs[1])
            console.log("songs[2]", songs[2])
            console.log("songs[3]", songs[3])
            console.log("songs.songname", songs.songname)
            console.log("songs[1]", songs.price)
            console.log("songs[2]", songs.seller)
            console.log("songs[3]", songs.buyer)

        }
        init();

    }, []);



    function showSongsForSale() {
        /*  var num = 0;
         var inum = 0;
         $("#songsforsale").show();
         // display bandmgrindex, how many band managers?
         App.contracts.BandApp.deployed().then(function(app){
           return app.songIndex();
           }).then(function(index){
             num = index;
             //console.log("app.bandMgrIndex on the blockchain is " + index);
             $("#songsforsale").html("<p>number of songs:" + num);
           }).then(function(){
               for (i=0; i<num; i++) {
                 App.contracts.BandApp.deployed().then(function(app){
                   //console.log(inumOfMgrs);
                   inum++;
                   return app.songs(inum-1);
                   }).then(function(song){
                     $("#songsforsale").append("<p>Name:"+song[0]
                     +" | price: "+ web3.fromWei(song[1], 'ether')+" ether");
                  //   +" <button id='buySong' type='submit'>Buy Song</button>");
                     var currentSong = song[0];
                     var currentPrice = song[1];
                     var currentMgr = song[2];
                     //0:name, 1:price, 2:seller
                     var songButton = '<button onclick="App.buyThisSong(\'' + song[0] + '\','+ song[1] + ',\'' + song[2] + '\')">buy '+song[0]+'</button>';
                     //var songButton = '<button onclick="App.buyThisSong(\''+song[0]+','+song[1]+','+song[2]+'\')">buy '+song[0]+'</button>';
                     
                     $("#songsforsale").append(songButton);
                     //inumOfMgrs++;
                     });
               }
             }); */
    }
    return (
        <div>
            <div id="songsforsale"></div>
            <div>
                <div>
                    <h2>Songs For Sale</h2>
                    <thead>
                        <tr>
                            <th>Song Name</th>
                            <th>Price</th>

                        </tr>
                    </thead>
                      <tbody>
                            {songs.map(song => (
                                <tr key={song.id}>
                                    <td>{song.songname}</td>
                                    <td>{web3.utils.fromWei(song.price)}</td>
                                    
                                </tr>
                            ))}
                        </tbody> 
                </div>
            </div>
        </div>
    );
}


export default SongsForSale;