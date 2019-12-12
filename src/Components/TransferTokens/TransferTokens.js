import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import './TransferTokens.css'; 

// Ethereum Items
import { abi } from '../../utils/contractAbi';

// Alerts
import { 
    tokenTransferSuccessAlert, 
    tokenTransferErorrAlert, 
    tokenAddressErorrAlert,
    tokenAmountErrorAlert,
    blockchainLoadingAlert 
} from '../../utils/alerts';

export default function TransferTokens(props) {
    const [recipientAddress, setRecipientAddress] = useState(''); 
    const [sendingAmount, setSendingAmount] = useState(0); 

    //Redux
    const token_balance = useSelector(state => state.token_balance);
    const contract_address = useSelector(state => state.contract_address);
    const userAddress = useSelector(state => state.address);
    const web3 = useSelector(state => state.web3);
    const dispatch = useDispatch(); 

    const transferTokens = (event) => {
        // Prevents the form from submitting 
        event.preventDefault(); 
        const { getTokenBalance, address } = props; 

        const contract = new web3.eth.Contract(abi, contract_address);
        const weiSendingAmount = web3.utils.toWei(sendingAmount);

        // token_balance is returned as a string. Adding a + to token_balance changes it to an int for the comparison logic. 
        if(recipientAddress.includes('0x') && recipientAddress.length === 42 && sendingAmount > 0 && sendingAmount <= +token_balance) {
            blockchainLoadingAlert();

            contract.methods.transfer(recipientAddress, weiSendingAmount).send({from: userAddress})
            .on('receipt', receipt => {
                tokenTransferSuccessAlert(receipt.transactionHash);
                setRecipientAddress(''); 
                setSendingAmount(0);
                getTokenBalance(address);
            })
            .on('error', error => {
                console.log(error);
                tokenTransferErorrAlert();
            });
            
        } else if(!recipientAddress.includes('0x') || recipientAddress.length !== 42) {
            tokenAddressErorrAlert();
            
        } else {
            tokenAmountErrorAlert();
        }
    }

    return (
        <div className='transfer-page-container'>
            <h1 className='transfer-title'>Transfer Tokens</h1>

            <form className='transfer-input-container'>
                <label>To:</label>
                <input className='input-box'
                        type='text'
                        placeholder='Recipient Address'
                        name='recipientAddress'
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}/>
                <label>Amount:</label>
                <input className='input-box'
                        type='number'
                        placeholder='Amount of Tokens'
                        name='sendingAmount'
                        value={sendingAmount}
                        onChange={(e) => setSendingAmount(e.target.value)}/>
            </form>
            
            <div className='transfer-button-container'>
                <button className='btn send-btn' onClick={transferTokens}>{'<Send/>'}</button>
                <span className='link-span' onClick={() => dispatch({type: 'TOGGLE_TOKEN_TRANSFER', payload:false})}>Cancel</span>
            </div>
        </div>
    )
}

