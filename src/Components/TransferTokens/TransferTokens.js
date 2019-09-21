import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import swal from '@sweetalert/with-react';
import './TransferTokens.css'; 

// Action Builders
import {setTokenBalance, toggleTokenTransfer} from '../../redux/reducer'; 

class TransferTokens extends Component {
    constructor() {
        super();

        this.state = {
            recipientAddress: '', 
            sendingAmount: 0 
        }
    };

    transferTokens = (event) => {
        // Prevents the form from submitting 
        event.preventDefault(); 
        const { web3 } = window
        const { token_balance, abi, contract_address, getTokenBalance } = this.props; 
        const { sendingAmount, recipientAddress } = this.state; 
        console.log('sending amount:', sendingAmount)
        console.log('token balance:', token_balance)

        const contract = web3.eth.contract(abi).at(contract_address);
        const weiSendingAmount = web3.toWei(sendingAmount);

        if(recipientAddress.includes('0x') && recipientAddress.length === 42 && 0 < sendingAmount && sendingAmount <= token_balance) {
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
                    this.setState({
                        recipientAddress: '', 
                        sendingAmount: 0
                    })
                    // Updates the token balance in redux after tokens are sent. 
                    setTimeout(() => {getTokenBalance()}, 25000)
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
        else if(0 > sendingAmount || sendingAmount > token_balance) {
            swal({
                icon: "error",
                title: "Amount Error",
                timer: 20000,
                text: `Please make sure that you are entering in a valid token amount.`
              })
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { sendingAmount, recipientAddress } = this.state; 
        const { toggleTokenTransfer } = this.props;
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
                            onChange={this.handleChange}/>
                    <label>Amount:</label>
                    <input className='input-box'
                            type='text'
                            placeholder='Amount of Tokens'
                            name='sendingAmount'
                            value={sendingAmount}
                            onChange={this.handleChange}/>
                </form>
                <div className='transfer-button-container'>
                    <button className='btn send-btn' onClick={this.transferTokens}>{'<Send/>'}</button>
                    <span className='link-span' onClick={() => toggleTokenTransfer(false)}>Cancel</span>
                </div>
                
            </div>
        )
    }
};

function mapStateToProps(state) {
    return state; 
};

export default connect(mapStateToProps, {setTokenBalance, toggleTokenTransfer})(TransferTokens); 
