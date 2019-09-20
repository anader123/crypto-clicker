import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 
import swal from '@sweetalert/with-react';
import './TransferTokens.css'; 

// Action Builders
import {setTokenBalance} from '../../redux/reducer'; 

class TransferTokens extends Component {
    constructor() {
        super();

        this.state = {
            recipientAddress: '', 
            sendingAmount: 0 
        }
    };

    componentDidMount() {
        axios.get('/auth/check_session')
            .then({

            })
            .catch(() => {
                this.props.history.push('/')
            })
    };

    transferTokens = () => {
        const { token_balance, abi, contract_address } = this.props; 
        const contract = window.web3.eth.contract(abi).at(contract_address);
        const { sendingAmount, recipientAddress } = this.state; 
        const weiSendingAmount = window.web3.toWei(sendingAmount);

        // const transactionParameters = {
        //     to: {contract_address},
        //     from: window.web3.eth.accounts[0],
        //     data: contract.transfer.call(recipientAddress, weiSendingAmount, (err, res) => console.log(res)).encodeABI(), 
        //   }

        if(recipientAddress.includes('0x') && recipientAddress.length === 42 && 0 < sendingAmount < token_balance) {

            contract.transfer.sendTransaction(recipientAddress, weiSendingAmount, (err, res) => {
                swal({
                    icon: "success",
                    title: "Tokens Successfully Sent",
                    closeOnClickOutside: false,
                    content: ( 
                    <div>
                        <p>Transaction Hash:</p>
                        <br/>
                        {/* res.data is the transaction hash */}
                        <p><a target="_blank" rel="noopener noreferrer" href={`https://ropsten.etherscan.io/tx/${res.data}`}>{res.data}</a></p>
                    </div>)
                  })
            })
            this.setState({
                recipientAddress: '', 
                sendingAmount: null
            })
        }
        else if(!recipientAddress.includes('0x') || recipientAddress.length !== 42) {
            swal({
                icon: "error",
                title: "Transfer Error",
                timer: 20000,
                text: `Please make sure that you are entering in a valid Ethereum address.`
              })
        }
        else if(0 > sendingAmount || sendingAmount > token_balance) {
            swal({
                icon: "error",
                title: "Transfer Error",
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
        const { token_balance, address } = this.props; 
        return (
            <div className='transfer-page-container'>
                <h1 className='transfer-title'>Transfer Tokens</h1>
                <div className='user-address-info'>
                    <p>Address: {address}</p>
                    <p>CryptoClicker Token Balance: {token_balance}</p>
                </div>
                <div className='transfer-input-container'>
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
                </div>
                <div className='transfer-button-container'>
                    <button className='btn send-btn' onClick={this.transferTokens}>{'<Send/>'}</button>
                    <Link to='/dashboard'><span className='link-span'>Cancel</span></Link>
                </div>
                
            </div>
        )
    }
};

function mapStateToProps(state) {
    return state; 
};

export default connect(mapStateToProps, {setTokenBalance})(TransferTokens); 
