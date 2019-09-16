import React from 'react';
import './LearnMore.css'; 
import { Link } from 'react-router-dom'; 

// Images 
import selectMenu from '../../img/selectMenu.png';
import changeNetwork from '../../img/changeNetwork.png';
import customToken from '../../img/addCustomToken.png';
import tokenDetails from '../../img/addTokenDetails.png';


export default function LearnMore() {
    return (
        <div className='about-page-container'>
            <div className='home-button'>
                <Link to='/dashboard'><span className='btn'>{'<Home/>'}</span></Link>
            </div>
            <h1 className='mm-title'>Installing and Setting Up MetaMask</h1>
            <p className='warning-text'>*If you were redirected to this page after clicking "Connect MetaMask", it means that you need to install the MetaMask Chrome extension.</p>
            <span className='mm-download-button'><a target="_blank" rel="noopener noreferrer" href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>{'<Download MetaMask/>'}</a></span> 
            <iframe className='mm-video' src="https://www.youtube-nocookie.com/embed/6Gf_kRE4MJU" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title='MetaMaskVid' allowFullScreen></iframe>
            <p className='mm-text'>CryptoClicker runs on the Ropsten Test Network. As a result, you will first need to make sure that you are connected to Ropsten.</p>
            <img className='mm-image' src={changeNetwork} alt='mm img'/>

            <p className='mm-text'>MetaMask defaults to the Mainnetwork. However, you can change to the Ropsten Network by clicking the network bar at the top and then selecting Ropsten. </p>

            <h1 className='mm-title'>Viewing Your CryptoClicker Tokens</h1>
            <p className='warning-text'>*Make sure that you change networks before adding the CryptoClicker Token to MM.</p>

            <img className='mm-image' src={selectMenu} alt='mm img'/>

            <img className='mm-image' src={customToken} alt='mm img'/>
            <p className='mm-text'>If you are connected to Ropsten, the Token Symbol and Decimals will auto populate after adding in the Token Contract Address.</p>
            <p className='warning-text'>CryptoClicker Token Address: 0x264A0131376cdD61EF0Ab11Cf0Ca3cC9F3f7548C</p>
            <img className='mm-image' src={tokenDetails} alt='mm img'/>
        </div>
    )
}
