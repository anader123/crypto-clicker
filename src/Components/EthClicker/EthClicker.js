import React, { Component } from 'react'; 
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import './EthClicker.css';
import swal from '@sweetalert/with-react';

// Action Builders
import {incrementClick, resetCount} from '../../redux/reducer'; 

// Images
import ethLogo from '../../img/ethlogo.png';
import blockLoad from '../../img/green-blockchainLoading.png';

class EthClicker extends Component {

    // Creates an axios call to the server that will mint tokens based on the user's click_balance and sets the state of click_balance to 0. Then an alert will tell the user if the transaction was successfull and display the transaction hash which links to Etherscan. 
    exchangeClicks = () => {
        const { getTokenBalance, resetCount, click_balance, address, network } = this.props; 
        this.tokenizeLoading();  
        axios.put('/api/exchanage', {click_balance, address})
            .then((res) => {
                swal({
                    icon: "success",
                    title: "Clicks Successfully Exchanged",
                    closeOnClickOutside: false,
                    content: ( 
                    <div>
                        <p>Transaction Hash:</p>
                        <br/>
                        {/* res.data is the transaction hash */}
                        <p><a target="_blank" rel="noopener noreferrer" href={`https://ropsten.etherscan.io/tx/${res.data}`}>{res.data}</a></p>
                    </div>)
                  })
                resetCount();
                // Makes sure that the user is connected to Ropsten before checking their token balance. 
                if(network === 'Ropsten') {
                    setTimeout(getTokenBalance(address),10000)
                }
            })
            .catch(() => {
                swal({
                    icon: "error",
                    title: "Tokenization Error",
                    timer: 20000,
                    text: `You must have at least 50 clicks before being able to tokenzie.`
                  })
            })
    };

    // TODO: have a function that runs every so after that stores state to the session
    // componentDidUpdate() {
    //     window.setInterval(this.updateClicks(), 10000)
    // };
    // updateClicks = () => {
    //     axios.post('/api/session_balance', {click_balance: this.props.click_balance})
    //         .then( res => {
    //             console.log(res)
    //         })
    //         .catch(err => console.log(err))
    // };

    // Alerts the user that the transaction has been submitted and is waiting for the blockchain to return a transaction hash. 
    tokenizeLoading = () => {
        swal({
            closeOnClickOutside: false,
            button: false, 
            content: (<div>
                <img className='block-load-img' src={blockLoad} alt='block loading'/>
                <p>Blockchain magic in progress...</p>
                <br/>
                <p>*Do not refresh page.</p>
                <br/>
            </div>)
          })
    }; 

    render() {
        const { click_balance, incrementClick } = this.props; 
        return (
            <div className='mid-dashboard-container'>
                    <h3 className='click-balance'>Click Balance: {click_balance}</h3>
                    <img className='eth-click' src={ethLogo} alt='eth logo' onClick={() => incrementClick(click_balance)}/>
                <div className='tokenize-button-container'>
                    <button className='btn' onClick={this.exchangeClicks}>{'<Tokenize Clicks/>'}</button>
                    <p className='tokenize-text'>*A minimum of 50 clicks are required in order to tokenize.</p>
                </div>
            </div>
        )
    }
}; 

function mapStateToProps(state) {
    return state; 
};

export default connect(mapStateToProps, {incrementClick, resetCount})(EthClicker); 