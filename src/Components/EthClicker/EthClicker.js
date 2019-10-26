import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import axios from 'axios'; 
import './EthClicker.css';
import swal from '@sweetalert/with-react';

// Images
import ethLogo from '../../img/ethlogo.png';
import blockLoad from '../../img/green-blockchainLoading.png';


export default function EthClicker(props) {
    const [ethAnimation, setEthAnimation] = useState(false); 
    const [clicked, setClicked] = useState(false);

    // Redux 
    let click_balance = useSelector(state => state.click_balance); 
    const address = useSelector(state => state.address); 
    const network = useSelector(state => state.network); 
    const dispatch = useDispatch(); 

    useEffect(() => {
        setInterval(updateClicks, 20000);
    }, [])
 
    // Updates the click balance from redux to the click_balance property in the session. 
    const updateClicks = () => {
        axios.post('/api/session_balance', {click_balance})
            .then( () => {
            })
            .catch(err => console.log(err))
    };
    
    // Animates the clicking and increments the click_balance. 
    const ethLogoClick = () => {
        dispatch({type: 'INCREMENT_CLICK', payload: ++click_balance})
        // props.incrementClick(this.props.click_balance); 
        setClicked(true); 
        setEthAnimation(!ethAnimation)
        
        // Prevents user from spamming clicks
        setTimeout(() => {
            setClicked(false);
        },120)
    };

    // Warning that pops up if the user is clicking too fast. 
    const clickSpeedWarning = () => {
        swal({
            icon: "warning",
            title: "Slow Clicking Speed",
            closeOnClickOutside: false,
            text: "It appears that you are clicking too fast."
          })
    };

    // Alerts the user that the transaction has been submitted and is waiting a transaction hash to be returned. 
    const tokenizeLoading = () => {
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

    // Creates an axios call to the server that will mint tokens based on the user's click_balance and sets the state of click_balance to 0. Then an alert will tell the user if the transaction was successfull and display the transaction hash which links to Etherscan. 
    const exchangeClicks = () => {
        const { getTokenBalance } = props; 
        tokenizeLoading();  
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
                dispatch({type: 'RESET_COUNT'});
                // Makes sure that the user is connected to Ropsten before checking their token balance. 
                if(network === 'Ropsten') {
                    setTimeout(() => {getTokenBalance()}, 30000)
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
