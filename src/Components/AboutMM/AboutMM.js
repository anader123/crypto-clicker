import React from 'react';
import './AboutMM.css'; 
import { Link } from 'react-router-dom'; 

export default function AboutMM() {
    return (
        <div className='about-page-container'>
            <Link to='/dashboard'><span className='btn'>{'<Home/>'}</span></Link>
            <h1 className='about-title'>About CryptoClicker</h1>
            <iframe className='mm-video' src="https://www.youtube-nocookie.com/embed/6Gf_kRE4MJU" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title='MetaMaskVid' allowFullScreen></iframe>
            <span className='mm-download-button'><a className="ethscan-account-link" target="_blank" rel="noopener noreferrer" href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>Download MetaMask</a></span> 
        </div>
    )
}
