import React, { useEffect } from 'react';
import axios from 'axios';
import './LearnMore.css'; 
import { Link } from 'react-router-dom'; 

// Images 
import selectMenu from '../../img/selectMenu.png';
import changeNetwork from '../../img/changeNetwork.png';
import customToken from '../../img/addCustomToken.png';
import tokenDetails from '../../img/addTokenDetails.png';
import customTab from '../../img/customTab.png'; 
import addTokenButton from '../../img/addTokenButton.png'; 

export default function LearnMore(props) {

    useEffect(() => {
        axios.get('/api/check_session')
            .then({})
            .catch(() => {
                props.history.push('/')
            })
    }, []);

    return (
        <div className='about-page-container'>
            <div className='home-button'>
                <Link to='/dashboard'><span className='btn'>{'<Home/>'}</span></Link>
            </div>

            {/* Explains how to set up MetaMask for CryptoClicker  */}
            <h1 className='mm-title'>Installing and Setting Up MetaMask</h1>
            <p className='warning-text'>*If you were redirected to this page after clicking "Connect MetaMask", it means that you need to install the MetaMask Chrome extension.</p>
            <span className='mm-download-button'><a target="_blank" rel="noopener noreferrer" href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>{'<Download MetaMask/>'}</a></span>
            <p className='mm-text'>CryptoClicker runs on the Ropsten Test Network. As a result, you will first need to make sure that you are connected to Ropsten.</p>
            <img className='mm-image' src={changeNetwork} alt='mm img'/>
            <p className='mm-text'>MetaMask defaults to the Mainnetwork. However, you can change to the Ropsten Network by clicking the network bar at the top and then selecting Ropsten. </p>

            {/* Explains how to view CryptoCliker tokens on MetaMask */}
            <h1 className='mm-title'>Viewing Your CryptoClicker Tokens</h1>
            <p className='warning-text'>*Make sure that you change to the Ropsten Test Network before adding the CryptoClicker Token to MM.</p>
            <img className='mm-image' src={selectMenu} alt='mm img'/>
            <p className='mm-text'>To view your tokens, click on Menu and then select Add Token.</p>
            <img className='mm-image' src={customToken} alt='mm img'/>
            <img className='mm-image' src={customTab} alt='mm img'/>
            <p className='mm-text'>If you are connected to Ropsten, the Token Symbol and Decimals will auto populate after adding in the Token Contract Address.</p>
            <p className='warning-text'>CryptoClicker Token Address: 0x264A0131376cdD61EF0Ab11Cf0Ca3cC9F3f7548C</p>
            <img className='mm-image' src={tokenDetails} alt='mm img'/>
            <img className='mm-image' src={addTokenButton} alt='mm img'/>
        </div>
    )
}
