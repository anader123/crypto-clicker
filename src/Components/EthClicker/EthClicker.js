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
    constructor() {
        super(); 

        this.state = {
            ethAnimation: false, 
            clicked: false
        }
    };

    // Animates the clicking and increments the click_balance. 
    ethLogoClick = () => {
        this.props.incrementClick(this.props.click_balance); 
        this.setState({
            clicked: true, 
            ethAnimation: !this.state.ethAnimation
        })

        // Prevents user from spamming clicks
        setTimeout(() => {
            this.setState({clicked: false})
        },120)
      };

    // Warning that pops up if the user is clicking too fast. 
    clickSpeedWarning = () => {
        swal({
            icon: "warning",
            title: "Slow Clicking Speed",
            closeOnClickOutside: false,
            text: "It appears that you are clicking too fast."
          })
    }

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
                    setTimeout(() => {getTokenBalance()}, 12000)
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

    // Alerts the user that the transaction has been submitted and is waiting a transaction hash to be returned. 
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
        const { click_balance } = this.props; 
        return (<div className='mid-dashboard-container'>
                    <h3 className='click-balance'>Click Balance: {click_balance}</h3>
                    <img className={this.state.ethAnimation ? 'eth-click':'eth-click eth-animation'} src={ethLogo} alt='eth logo' onClick={!this.state.clicked ? this.ethLogoClick : this.clickSpeedWarning}/>
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