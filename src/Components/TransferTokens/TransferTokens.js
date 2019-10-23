import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import swal from '@sweetalert/with-react';
import './TransferTokens.css'; 

export default function TransferTokens(props) {
    const [recipientAddress, setRecipientAddress] = useState(''); 
    const [sendingAmount, setSendingAmount] = useState(0); 

    //Redux
    const token_balance = useSelector(state => state.token_balance);
    const contract_address = useSelector(state => state.contract_address);
    const abi = useSelector(state => state.abi);
    const dispatch = useDispatch(); 

    const transferTokens = (event) => {
        // Prevents the form from submitting 
        event.preventDefault(); 
        const { web3 } = window
        const { getTokenBalance } = props; 

        const contract = web3.eth.contract(abi).at(contract_address);
        const weiSendingAmount = web3.toWei(sendingAmount);

        // token_balance is returned from MetaMask as a string. Adding a + to token_balance changes it to a num for the comparison logic. 
        if(recipientAddress.includes('0x') && recipientAddress.length === 42 && sendingAmount > 0 && sendingAmount <= +token_balance) {
            contract.transfer.sendTransaction(recipientAddress, weiSendingAmount, (err, res) => {
                if(!err) {
                    swal({
                        icon: "success",
                        title: "Tokens Successfully Sent",
                        closeOnClickOutside: false,
                        content: (
                            <div>
                                <p>Transaction Hash:</p>
                                <br/>
                                {/* res is the transaction hash */}
                                <p><a target="_blank" rel="noopener noreferrer" href={`https://ropsten.etherscan.io/tx/${res}`}>{res}</a></p>
                            </div>)
                      })
                    setRecipientAddress(''); 
                    setSendingAmount(0);

                    // Updates the token balance in redux after tokens are sent. 
                    setTimeout(() => {getTokenBalance()}, 40000)
                }
                else {
                    swal({
                        icon: "error",
                        title: "Error Transferring Tokens",
                        closeOnClickOutside: false,
                      })
                }
            })
        }
        else if(!recipientAddress.includes('0x') || recipientAddress.length !== 42) {
            swal({
                icon: "error",
                title: "Address Error",
                timer: 20000,
                text: `Please make sure that you are entering in a valid Ethereum address.`
              })
        }
        else if(0 > sendingAmount || sendingAmount > +token_balance) {
            swal({
                icon: "error",
                title: "Amount Error",
                timer: 20000,
                text: `Please make sure that you are entering in a valid token amount.`
              })
        }
    };

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
};

