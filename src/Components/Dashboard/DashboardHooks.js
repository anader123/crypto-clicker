import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
// import { connect } from 'react-redux'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import './Dashboard.css';

import Web3 from 'web3';

// Alerts
import { metaMaskRequiredAlert, metaMaskConnectedAlert } from '../../utils/alerts';


// Components
import EthClicker from '../EthClicker/EthClicker'; 
import ConnectMetaMask from '../ConnectMetaMask/ConnectMetaMask'; 
import TransferTokens from '../TransferTokens/TransferTokens'; 
import AccountInfo from '../AccountInfo/AccountInfo'; 

export default function Dashboard(props) {
    const [menuToggle, setMenuToggle] = useState(true);
    const [web3, setWeb3] = useState(null); 

    // Redux
    const dispatch = useDispatch(); 
    const email = useSelector(state => state.email);
    const abi = useSelector(state => state.abi); 
    const contract_address = useSelector(state => state.contract_address); 
    const click_balance = useSelector(state => state.click_balance); 
    const metaMaskConnected = useSelector(state => state.metaMaskConnected);
    const transfer_toggle = useSelector(state => state.transfer_toggle); 
    
    const setNetwork = (network) => dispatch({type: 'SET_NETWORK', payload: network}); 
    const setTokenBalance = (amount) => dispatch({type: 'SET_TOKEN_BALANCE', payload: amount}); 
    const toggleTokenTransfer = (toggle) => dispatch({type: 'TOGGLE_TOKEN_TRANSFER', payload: toggle});
    const setAddress = (address) => dispatch({type: 'SET_ADDRESS', payload: address});
    const setMetaMask = (bool) => dispatch({type: 'SET_METAMASK', payload: bool});
    const setInitialState = (initalState) => dispatch({type: 'SET_INITIAL_STATE', payload: initalState});

    useEffect(async () => {
    // Makes sure that the user can't access the dashboard page if they aren't logged in. 
        try {
            await axios.get('/api/check_session');
            checkSessionRefresh(); 
        } catch (error) {
            props.history.push('/');
        }
    }, []);
 
    // If the user has refreshed the page and there still is a session then it grabs the email and click_balance from the session and sets it to state in redux. 
    const checkSessionRefresh = async() => {
        if(email === '') {
            try {
                const response = await axios.get('/api/session_info');
                setInitialState(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Enables the website to view the user's MetaMask's adddresses. If the person doesn't have MM installed, it pushes them to the learn more page where they can download it. 
    const connectMetaMask = async () => {
        if(window.ethereum === undefined) {
            metaMaskRequiredAlert();
            props.history.push('/about'); 
        }
        else {
            try {
                console.log('hit1')

                const accounts = await window.ethereum.enable();
                const web3 = await new Web3(Web3.givenProvider);
                await setWeb3(web3);
                console.log(web3);
                setAddress(accounts[0]);
                setMetaMask(true);
                metaMaskConnectedAlert(accounts);
                checkAccount();
                checkNetwork(); 
                networkMM();
                console.log('hit')
                // Prevents the page from reloading when the user changes networks. 
                window.ethereum.autoRefreshOnNetworkChange = false;

            } catch (error) {
                console.log(error)
            }
        }
    }

    // Gets token balance for user's address. The method will return 0 if the user isn't on the Ropsten Network. 
    const getTokenBalance = async () => {
        if(window.ethereum.selectedAddress !== null ) {
            const currentAddress = window.ethereum.selectedAddress; 
            console.log(web3)
            const contract = new web3.eth.Contract(abi, contract_address);
            const balance = await contract.methods.balanceOf(currentAddress).call();
            setTokenBalance(balance);
        }
    // Returns the user to the connect MetaMask page if they logout. 
        else {
            setMetaMask(false);
        }
    }
    

    const checkAccount = () => {
        window.ethereum.on('accountsChanged', (accounts) => {
            setAddress(accounts[0])
            getTokenBalance(); 
        })
    }

    // Function is only fired when the user changes the network in MetaMask. Using window.ethereum.on instead of setInterval.
    const networkMM = () => {
        window.ethereum.on('networkChanged', () => {
            checkNetwork(); 
        })
    }

    // Checks to see which Ethereum network the user is using in their MetaMask extension. 
    const checkNetwork = () => {
        console.log('web3', web3)
        web3.version.getNetwork((err, netId) => {
            switch (netId) {
                case "1":
                setTokenBalance('0');
                return setNetwork('Main Network')
                case "3":
                getTokenBalance()
                return setNetwork('Ropsten')
                case "4":
                setTokenBalance('0');                
                return setNetwork('Rinkeby')
                case "42":
                setTokenBalance('0');                
                return setNetwork('Kovan')
                default:
                setTokenBalance('0');                
                return setNetwork('Unknown Network')
            }
            })
    }

    const logout = async () => {
        try {
            await axios.post('/api/logout', {click_balance});
            toggleMenu();
            setMetaMask(false); 
            toggleTokenTransfer(false); 
            props.history.push('/'); 

        } catch (error) {
            console.log(error)
        }
    }

    // Slides out the menu for mobile user's.
    const toggleMenu = () => {
        setMenuToggle(!menuToggle);
    }

    return (
        <div>
            {!metaMaskConnected 
            ?
            (<div className='main-dashboard-container'>
            <div className='upper-dashboard-container'>
                <AccountInfo metaMaskConnected={metaMaskConnected} /> 
                <div className='dashboard-buttons'>
                    <Link to='/about'><button className='btn'>{'<Learn More/>'}</button></Link>
                    <button className='btn red-btn' onClick={logout}>{'<Logout/>'}</button>
                </div>
                <nav className='navbar-container'>
                    <div className='navbar-icon' onClick={toggleMenu}>
                        &#9776; 
                        </div>
                        <div className='menu-container'>
                        <ul className={menuToggle? 
                    'navbar-menu'
                        :
                    'navbar-menu slide'}>
                            <li><Link to='/about'>LEARN MORE</Link></li>
                            <li onClick={logout}>LOGOUT</li>
                            <li onClick={toggleMenu}><Link to='/delete'>DELETE ACCOUNT</Link></li>
                        </ul>
                        </div>
                </nav>
            </div>
            <ConnectMetaMask connectMetaMask={connectMetaMask}/> 
            <div className='delete-button'>
                <Link to='/delete'><button className='btn red-btn'>{'<Delete Account/>'}</button></Link>
            </div>
        </div>)
        :
        (<div className='main-dashboard-container'>
            <div className='upper-dashboard-container'>

                <AccountInfo metaMaskConnected={metaMaskConnected} /> 

                <div className='dashboard-buttons'>
                    <button className='btn' onClick={() => toggleTokenTransfer(!transfer_toggle)}>{'<TRANSFER TOKENS/>'}</button>
                    <Link to='/about'><button className='btn'>{'<Learn More/>'}</button></Link>
                    <button className='btn red-btn' onClick={logout}>{'<Logout/>'}</button>
                </div>

                <nav className='navbar-container'>
                    <div className='navbar-icon' onClick={toggleMenu}>
                        &#9776; 
                    </div>

                    <div className='menu-container'>
                        <ul className={menuToggle? 
                        'navbar-menu'
                            :
                        'navbar-menu slide'}>
                            <li onClick={() => toggleTokenTransfer(true)}>TRANSFER TOKENS</li>
                            <li onClick={toggleMenu}><Link to='/about'>LEARN MORE</Link></li>
                            <li onClick={logout}>LOGOUT</li>
                            <li onClick={toggleMenu}><Link to='/delete'>DELETE ACCOUNT</Link></li>
                        </ul>
                    </div>
                </nav>
                
            </div>
            {!transfer_toggle 
            ?
            (<div>
                {/* User will click the eth image to increase their click_balance */}
                <EthClicker getTokenBalance={getTokenBalance}/> 
            </div>)
            :
            (<div>
                {/* User can toggle to view and transfer CCLT tokens out of their MetaMask account. */}
                <TransferTokens getTokenBalance={getTokenBalance}/> 
            </div>)
            }

            <div className='delete-button'>
                <Link to='/delete'><button className='btn red-btn'>{'<Delete Account/>'}</button></Link>
            </div>

        </div>)
        }
        </div>
    )
}
