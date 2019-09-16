// Web3 Setup 
require('dotenv').config();
const Web3 = require('web3'); 
const contractABI = require('./contractABI'); 
const abi = contractABI.abi; 

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

// Handles Updating the Session to the Click Balance on State
const updateSessionBalance = (req, res) => {
    const { click_balance } = req.body; 
    req.session.click_balance = click_balance; 
    res.status(200).send('Clicks have been saved');
};

// Exchanges Clicks for Tokens and Sets DB Click Value to 0 in the DB 
const exchangeClicks = (req, res) => {
    const { click_balance, address } = req.body; 
    const user_id = req.session.user_id; 
    const string_click_balance = click_balance.toString();
    const db = req.app.get('db'); 

    if(click_balance < 50) {
        res.status(500).send('You need at least 50 clicks to exchanage')
    }
    else {
        const tokenMintData = contract.methods.mint(address , web3.utils.toWei(string_click_balance)).encodeABI();

        const transactionObject = {
            from: MINTING_ADDRESS,
            to: CONTRACT_ADDRESS, 
            gas: web3.utils.toHex(800000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('19', 'gwei')), 
            data: tokenMintData
        };

        web3.eth.sendTransaction(transactionObject)
            .then(web3Response => {
                res.status(200).send(web3Response.transactionHash)
                db.update_balance([0, user_id])
            })
            .catch(err => {
                console.log(err)
            });
            // TODO: might have to handle the promise from this. 
    }
};

module.exports = {
    updateSessionBalance,
    exchangeClicks
};