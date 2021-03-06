# CryptoClicker 
Similar to Cookie Clicker, CryptoClicker is an incremental game where users can score points by clicking. However, CryptoClicker allows users to turn their in-game currency into Ethereum ERC20 tokens. As a result, cryptoclicker is a proof of concept of how a game could reduce friction for players trying to sell their in-game currency on secondary markets e.g. selling Runescape or WoW gold. 

# What I learned 
* Deployed a smart contract using the [Remix IDE](https://remix.ethereum.org). 
* Created an interface that allowed users to transfer [ERC20 tokens](https://eips.ethereum.org/EIPS/eip-20). 
* Initially wrote the project using Class components, but went back and rewrote everything using [React Hooks](https://reactjs.org/docs/hooks-overview.html).
* Worked with the [MetaMask API](https://metamask.github.io/metamask-docs/) to automatically update the display if the user changes addresses or networks. 
* Integrated Redux to keep track of user's information as they navigate the website. 
* Tested Contract using [Gancache](https://www.trufflesuite.com/docs/ganache/overview).
* Wrote code that allowed the server to sign Ethereum transactions with it's own private key using [Web3.js](https://web3js.readthedocs.io/en/v1.2.1/). 
* Hashed and stored passwords using Bcrypt. 
* Added [Sweet Alerts](https://sweetalert.js.org) to display the transaction hash to the user after a transaction has been submitted to the blockchain. 

# Web3.js Server Code

```javascript 
// Web3 Setup 
require('dotenv').config();
const Web3 = require('web3'); 
const contractABI = require('./contractABI'); 
const { abi } = contractABI; 

// ETH ENV Variables
const {
    WEB3_PROVIDER,
    MINTING_KEY,
    CONTRACT_ADDRESS,
    MINTING_ADDRESS
} = process.env;

// Contract Initialization 
const web3 = new Web3(WEB3_PROVIDER);
web3.eth.accounts.wallet.add(MINTING_KEY); 
const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

// Turns clicks into CryptoClicker Tokens and sets DB click_balance to 0
const exchangeClicks = async (req, res) => {
    const { click_balance, address } = req.body; 
    const user_id = req.session.user_id; 
    const string_click_balance = click_balance.toString();
    const db = req.app.get('db'); 

    if(click_balance < 50) {
        res.status(400).send('You need at least 50 clicks to tokenize')
    }
    else {
        // Data for Contract call, click_balance must be formatted as a string. 
        const tokenMintData = contract.methods.mint(address , web3.utils.toWei(string_click_balance)).encodeABI();

        const transactionObject = {
            from: MINTING_ADDRESS,
            to: CONTRACT_ADDRESS, 
            gas: web3.utils.toHex(800000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('19', 'gwei')), 
            data: tokenMintData
        };

        // Sends transaction to the blockchain and setting click_balance in DB and session to 0.
        try {
            await web3.eth.sendTransaction(transactionObject)
                .on('receipt', (receipt) => {
                    res.status(200).send(receipt.transactionHash);
                    db.update_balance([0, user_id]);
                    req.session.click_balance = 0;
                })
                .on('error', err => {
                    console.log(err.message);
                });
        }
        catch (err) {
            console.log(err)
        }
    }
};