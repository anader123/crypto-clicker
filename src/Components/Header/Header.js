import React from 'react';
import './Header.css';
import clickIcon from './../../img/green-click.svg';

export default function Header() {
    return (
        <div className='header-container'>
            <div className='title-container'>
                <h1>Crypto<span>Clicker</span></h1>
                <img className='click-icon' src={clickIcon} alt='click icon'/>
            </div>
            <div className='accent-line'/>
        </div>
    )
}
