import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import axios from 'axios'; 
import './EthClicker.css';

// Images
import ethLogo from '../../img/ethlogo.png';
import blockLoad from '../../img/green-blockchainLoading.png';

// Alerts 
import { 
    clickingSpeedAlert, 
    tokenizeLoadingAlert, 
    tokensSuccessfullyExchangedAlert, 
    tokensExchangedErorrAlert 
} from '../../utils/alerts';

export default function EthClicker(props) {
    const [ethAnimation, setEthAnimation] = useState(false); 
    const [clicked, setClicked] = useState(false);

    // Redux 
    let click_balance = useSelector(state => state.click_balance); 
    const address = useSelector(state => state.address); 
    const network = useSelector(state => state.network); 
    const dispatch = useDispatch(); 
    const incrementClick = (click_balance) => dispatch({type: 'INCREMENT_CLICK', payload: ++click_balance}); 

    // useEffect(() => {
    //     // Updates the click balance in redux to the click_balance property in the session. 
    //     const updateClicks = () => {
    //         console.log('hit');
    
    //         axios.post('/api/session_balance', {click_balance})
    //             .then( () => {
    //                 console.log(click_balance)
    //             })
    //             .catch(err => console.log(err))
    //     };
        
    //     setInterval(updateClicks, 20000);
    // }, [click_balance])
 
    // Animates the clicking and increments the click_balance. 
    const ethLogoClick = () => {
        incrementClick(click_balance); 
        setClicked(true); 
        setEthAnimation(!ethAnimation)
        
        // Prevents user from spamming clicks
        setTimeout(() => {
            setClicked(false);
        },120)
    }

    // Warning that pops up if the user is clicking too fast. 
    const clickSpeedWarning = () => {
        clickingSpeedAlert();
    }

    // Creates an axios call to the server that will mint tokens based on the user's click_balance and sets the state of click_balance to 0. Then an alert will tell the user if the transaction was successfull and display the transaction hash which links to Etherscan. 
    const exchangeClicks = () => {
        const { getTokenBalance } = props; 
        tokenizeLoadingAlert();
        axios.put('/api/exchanage', {click_balance, address})
            .then((res) => {
                tokensSuccessfullyExchangedAlert(res);

                dispatch({type: 'RESET_COUNT'});
                // Makes sure that the user is connected to Ropsten before checking their token balance. 
                if(network === 'Ropsten') {
                    setTimeout(() => {getTokenBalance()}, 30000)
                }
            })
            .catch(() => {
                tokensExchangedErorrAlert();
            })
    };

    return (
        <div className='mid-dashboard-container'>
            <h3 className='click-balance'>Click Balance: {click_balance}</h3>
            <p className='click-balance-text'>Click the Ethereum logo below to increment your click balance.</p>
            
            <img className={ethAnimation ? 'eth-click':'eth-click eth-animation'} src={ethLogo} alt='eth logo' onClick={!clicked ? ethLogoClick : clickSpeedWarning}/>

            <div className='tokenize-button-container'>
                <button className='btn' onClick={exchangeClicks}>{'<Tokenize Clicks/>'}</button>
                <p className='tokenize-text'>*A minimum of 50 clicks are required in order to tokenize.</p>
            </div>
        </div>
    )
};
