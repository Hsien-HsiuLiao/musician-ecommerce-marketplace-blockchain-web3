import React from 'react';

function Header({accounts, contractAddress, owner}) {
    return (
        <header>
            <h1 class="text-center">Band App</h1>
            
            {/* function updateInterface() will show current eth address in use by MetaMask */}
            <div id="currentAddress">current account address: {accounts[0]}</div>
            <div>contract address: {contractAddress}</div>
            <div>owner of contract: {owner}</div>
            <br />
            <hr />
        </header>
    );
}


export default Header;