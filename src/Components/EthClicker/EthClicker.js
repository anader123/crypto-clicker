import React, { Component } from 'react'; 
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import './EthClicker.css';
import swal from '@sweetalert/with-react';

// Action Builder
import {incrementClick, resetCount} from '../../redux/reducer'; 

// Images
import ethLogo from '../../img/ethlogo.png';
import blockLoad from '../../img/green-blockchainLoading.png';




class EthClicker extends Component {

    exchangeClicks = () => {
        this.tokenizeLoading(); 
        axios.post('/api/exchanage', {click_balance: this.props.click_balance, address: this.props.address})
            .then((res) => {
                swal({
                    icon: "success",
                    title: "Clicks Successfully Exchanged",
                    closeOnClickOutside: false,
                    content: ( 
                    <div>
                        <p>Transaction Hash:</p>
                        <br/>
                        <p><a target="_blank" rel="noopener noreferrer" href={`https://ropsten.etherscan.io/tx/${res.data}`}>{res.data}</a></p>
                    </div>)
                  })
                this.props.resetCount();
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