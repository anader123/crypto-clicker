import React from 'react'; 
import clickBalanceInfo from '../../img/clickBalance.png';


export default function CryptoClickerInfo(props) {
    return (
        <div>
            <div className='mm-sentences'>
                    <p>Welcome to CryptoClicker, a website that allows you to tokenize your in game currency.</p> 
                    <p className='second-mm-sentence'>Begin by connecting your Ethereum Wallet.</p>
                    <button className='btn mm-btn' onClick={props.connectMetaMask}>{'<Connect MM/>'}</button>
            </div>
            <div className='learn-cc-info'>
                <h1 className='mm-title'>Playing Cryptoclicker</h1>

                <p className='click-info-text'>Similar to Cookie Clicker, CryptoClicker is an incrementor game where players click to earn points. You can increment your click balance by clicking the Ethereum logo after connecting MetaMask. Once you have scored at least 50 clicks, you can click the "Tokenize Clicks" button under the logo to convert your in-game click balance to CryptoClicker Tokens. These tokens will be sent to the MetaMask address that you are currently using.</p>
                
                <img className='click-info-image' alt='mm img' src={clickBalanceInfo}/>
            </div>
        </div>
    )
}
