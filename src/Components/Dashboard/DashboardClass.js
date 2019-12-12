import React, { Component } from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import './Dashboard.css';

// Ethereum Items 
import Web3 from 'web3';
import { abi } from '../../utils/contractAbi';

// Redux Actions
import { 
    setInitialState,
    setAddress,
    setTokenBalance,
    setNetwork,
    setMetaMask,
    toggleTokenTransfer,
    setWeb3
} from '../../redux/actions';

// Alerts
import { 
    ethWalletRequired, 
    metaMaskConnectedAlert, 
    networkErrorAlert 
} from '../../utils/alerts';

// Components
import EthClicker from '../EthClicker/EthClicker'; 
import ConnectMetaMask from '../ConnectMetaMask/ConnectMetaMask'; 
import TransferTokens from '../TransferTokens/TransferTokens'; 
import AccountInfo from '../AccountInfo/AccountInfo'; 

class DashboardClass extends Component {
    constructor() {
        super();

        this.state = {
            menuToggle: null,
        }
    }

    componentDidMount = async () => {
        const { setWeb3 } = this.props;
        // Makes sure that the user can't access the dashboard page if they aren't logged in. 
        try {
            await axios.get('/api/check_session');
            this.checkSessionRefresh(); 
            const web3 = await new Web3(Web3.givenProvider);
            setWeb3(web3);
        } 
        catch (error) {
            this.props.history.push('/');
        }
    }

     // If the user has refreshed the page and there still is a session then it grabs the email and click_balance from the session and sets it to state in redux. 
    checkSessionRefresh = async () => {
        const { setInitialState } = this.props;
        if(this.props.email === '') {
            try {
                const response = await axios.get('/api/session_info');
                setInitialState(response.data);
            } 
            catch (error) {
                console.log(error);
            }
        }
    }

    // Enables the website to view the user's wallet adddresses. If the person doesn't have a wallet installed, it pushes them to the learn more page where they can download it. 
    connectMetaMask = async () => {
        const { setAddress, setMetaMask, } = this.props;
        if(window.ethereum === undefined) {
            ethWalletRequired();
            this.props.history.push('/about'); 
        }
        else {
            if(window.ethereum.networkVersion === '3') {
                try {
                    const accounts = await window.ethereum.enable();
    
                    setAddress(accounts[0]);
                    setMetaMask(true);
                    metaMaskConnectedAlert(accounts);
                    this.checkAccount();
                    this.checkNetwork(); 
                    this.networkMM();
    
                    // Prevents the page from reloading when the user changes networks. 
                    window.ethereum.autoRefreshOnNetworkChange = false;
    
                } 
                catch (error) {
                    console.log(error)
                }
            } 
            else {
                networkErrorAlert();
            }
        }
    }

    // Gets token balance for user's address. The method will return 0 if the user isn't on the Ropsten Network. 
    getTokenBalance = async (address) => {
        const { web3, contract_address, setTokenBalance, setMetaMask } = this.props;
        if(address) {
            try {
                const contract = new web3.eth.Contract(abi, contract_address);
                const balance = await contract.methods.balanceOf(address).call();
                const convertedBalance = web3.utils.fromWei(balance, 'ether');
                setTokenBalance(convertedBalance);
            }
            catch (error) {
                console.log(error);
            }
        }
    // Returns the user to the connect wallet page if they logout. 
        else {
            setMetaMask(false);
        }
    }

    checkAccount = () => {
        const { setAddress } = this.props; 
        window.ethereum.on('accountsChanged', (accounts) => {
            setAddress(accounts[0])
            this.getTokenBalance(accounts[0]); 
        })
    }

    // Function is only fired when the user changes the network in MetaMask. Using window.ethereum.on instead of setInterval.
    networkMM = () => {
        window.ethereum.on('networkChanged', () => {
            this.checkNetwork(); 
        })
    }

    // Checks to see which Ethereum network the user is using in their MetaMask extension. 
    checkNetwork = () => {
        const { setNetwork, address } = this.props;
        this.getTokenBalance(address);
        setNetwork('Ropsten');
    }

    logout = async () => {
        const { click_balance, setMetaMask, toggleTokenTransfer } = this.props; 

        try {
            await axios.post('/api/logout', { click_balance });
            this.toggleMenu();
            setMetaMask(false); 
            toggleTokenTransfer(false); 
            this.props.history.push('/'); 

        } 
        catch (error) {
            console.log(error)
        }
    }

    // Slides out the menu for mobile user's.
    toggleMenu = () => {
        this.setState({menuToggle: !this.state.menuToggle});
    }

    render() {
        const { metaMaskConnected, toggleTokenTransfer, transfer_toggle } = this.props;
        const { menuToggle } = this.state;
        return (
            <div>
                {!metaMaskConnected 
                    ?
                    (<div className='main-dashboard-container'>
                    <div className='upper-dashboard-container'>
                        <AccountInfo metaMaskConnected={metaMaskConnected} /> 
                        <div className='dashboard-buttons'>
                            <Link to='/about'><button className='btn'>{'<Learn More/>'}</button></Link>
                            <button className='btn red-btn' onClick={this.logout}>{'<Logout/>'}</button>
                        </div>
                        <nav className='navbar-container'>
                            <div className='navbar-icon' onClick={this.toggleMenu}>
                                &#9776; 
                                </div>
                                <div className='menu-container'>
                                <ul className={menuToggle? 
                            'navbar-menu'
                                :
                            'navbar-menu slide'}>
                                    <li><Link to='/about'>LEARN MORE</Link></li>
                                    <li onClick={this.logout}>LOGOUT</li>
                                    <li onClick={this.toggleMenu}><Link to='/delete'>DELETE ACCOUNT</Link></li>
                                </ul>
                                </div>
                        </nav>
                    </div>
                    <ConnectMetaMask connectMetaMask={this.connectMetaMask}/> 
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
                            <button className='btn red-btn' onClick={this.logout}>{'<Logout/>'}</button>
                        </div>

                        <nav className='navbar-container'>
                            <div className='navbar-icon' onClick={this.toggleMenu}>
                                &#9776; 
                            </div>

                            <div className='menu-container'>
                                <ul className={menuToggle? 
                                'navbar-menu'
                                    :
                                'navbar-menu slide'}>
                                    <li onClick={() => toggleTokenTransfer(true)}>TRANSFER TOKENS</li>
                                    <li onClick={this.toggleMenu}><Link to='/about'>LEARN MORE</Link></li>
                                    <li onClick={this.logout}>LOGOUT</li>
                                    <li onClick={this.toggleMenu}><Link to='/delete'>DELETE ACCOUNT</Link></li>
                                </ul>
                            </div>
                        </nav>
                        
                    </div>
                    {!transfer_toggle 
                    ?
                    (<div>
                        {/* User will click the eth image to increase their click_balance */}
                        <EthClicker getTokenBalance={this.getTokenBalance}/> 
                    </div>)
                    :
                    (<div>
                        {/* User can toggle to view and transfer CCLT tokens out of their MetaMask account. */}
                        <TransferTokens getTokenBalance={this.getTokenBalance}/> 
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
}

function mapStateToProps(state) {
    return state; 
}

export default connect(mapStateToProps, {setAddress, setNetwork, setMetaMask, setTokenBalance, toggleTokenTransfer, setInitialState, setWeb3})(DashboardClass); 