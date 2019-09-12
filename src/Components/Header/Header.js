import React from 'react';
import './Header.css';
import ethLogo from '../../img/ethlogo.png';

export default function Header() {
    return (
        <div className='header-container'>
            <h1>CryptoClicker</h1>
            <img className='eth-logo' src={ethLogo} alt='eth logo'/>
        </div>
    )
}
