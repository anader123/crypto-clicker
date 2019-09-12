import React from 'react';
import './Header.css';
import clickIcon from './../../img/click-icon.svg';
// import ethLogo from '../../img/ethlogo.png';

export default function Header() {
    return (
        <div className='header-container'>
            <h1>Crypto<span>Clicker</span></h1>
            <img className='click-icon' src={clickIcon} alt='click icon'/>
            {/* <img className='eth-logo' src={ethLogo} alt='eth logo'/> */}
        </div>
    )
}
