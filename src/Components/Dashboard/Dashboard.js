import React, { Component } from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import './Dashboard.css';
import swal from '@sweetalert/with-react';
import TransferTokens from '../TransferTokens/TransferTokens'; 

// Component for keeping track of user's clicks
import EthClicker from '../EthClicker/EthClicker'; 

// Action Builders
import {setAddress, setNetwork, setMetaMask, setTokenBalance, toggleTokenTransfer, setInitialState} from '../../redux/reducer'; 

class Dashboard extends Component {
    constructor() {
        super(); 

        this.state = {
            menuToggle: true
        }
    }

    componentDidMount() {
        this.keepOffLogin();
    };

    // Makes sure that the user can't access the dashboard page if they aren't logged in. 
    keepOffLogin = () => {
        axios.get('/auth/check_session')
            .then(() => {
                this.checkSessionRefresh(); 
            })
            .catch(() => {
                this.props.history.push('/');
            })
    };

    // If the user has refreshed the page and there still is a session then it grabs the email and click_balance from the session and sets it to state in redux. 
    checkSessionRefresh = () => {
        const { email, setInitialState } = this.props; 
        if(email === '') {
            axios.get('/auth/session_info')
                .then((res) => {
                    setInitialState(res.data)
                })
        }
    };

    // Enables the website to view the user's MetaMask's adddresses. If the person doesn't have MM installed, it pushes them to the learn more page where they can download it. 
    connectMetaMask = () => {
        if(window.ethereum === undefined) {
            swal({
                icon: "warning",
                title: "MetaMask Required",
                timer: 23000,
                content: (<div>
                    <p>Please download the MetaMask Chrome extension.</p>
                    <br/> 
                    <p>If you just now downloaded the extension, please refresh the page.</p>
                </div>)
                })
            this.props.history.push('/about'); 
        }
        else {
            window.ethereum.enable()
                .then((response) => {
                    this.props.setAddress(response[0]);
                    this.props.setMetaMask(true);
                    swal({
                        icon: "success",
                        title: "MetaMask Connected 🦊",
                        timer: 150000,
                        content: (<div>
                            <p>Address:</p><br/><p>{`${response[0]}`}</p>
                        </div>)
                        })
                    this.checkAccount();
                    this.checkNetwork(); 
                    this.networkMM();
                    this.addressMM();
                    // Prevents the page from reloading when the user changes networks. 
                    window.ethereum.autoRefreshOnNetworkChange = false;
                })
                .catch(err => console.log(err))
        }
    };

    // Gets token balance for user's address. The method will return 0 if the user isn't on the Ropsten Network. 
    getTokenBalance = () => {
        const { web3, ethereum } = window 
        const currentAddress = ethereum.selectedAddress; 
        const { abi, contract_address, setTokenBalance } = this.props; 
        const contract = web3.eth.contract(abi).at(contract_address);
        contract.balanceOf.call(currentAddress, (err, res) => {
            setTokenBalance(web3.fromWei(JSON.parse(res)))
        }) 
    };

    // Checks if the user has changed their MetaMask address and updates redux to the new address. 
    checkAccount = () => {
        const { address, setAddress } = this.props; 
        const currentAddress = window.ethereum.selectedAddress; 
        if (currentAddress !== address) {
            setAddress(currentAddress)
            this.getTokenBalance()
        }
    };

    // Checks to see which Ethereum network the user is using in their MetaMask extension. 
    checkNetwork = () => {
        const { web3 } = window; 
        const { setNetwork, setTokenBalance } = this.props 
       web3.version.getNetwork((err, netId) => {
            switch (netId) {
                case "1":
                setTokenBalance(0);
                return setNetwork('Mainnet')
                case "3":
                this.getTokenBalance()
                return setNetwork('Ropsten')
                case "4":
                setTokenBalance(0);
                return setNetwork('Rinkeby')
                case "42":
                setTokenBalance(0);
                return setNetwork('Kovan')
                default:
                setTokenBalance(0);
                return setNetwork('Unknown Network')
            }
            })
    };

    // Function is only fired when the user changes the network in MetaMask. Using ethereum.on instead of setInterval.
    networkMM = () => {
        window.ethereum.on('networkChanged', () => {
            this.checkNetwork(); 
        })
    };

    // Checks to see if the user has changed their MetaMask address. 
    addressMM = () => {
        setInterval(this.checkAccount, 1000)
    };

    logout = () => {
        const { setMetaMask, history, click_balance, toggleTokenTransfer } = this.props; 
        axios.post('/auth/logout', {click_balance})
            .then( () => {
                this.toggleMenu();
                setMetaMask(false); 
                toggleTokenTransfer(false); 
                history.push('/'); 
            })
            .catch(err => console.log(err))
    };

    // Slides out the menu for mobile user's.
    toggleMenu = () => {
        this.setState({
            menuToggle: !this.state.menuToggle 
        })
    }

    render() {
        const { email, address, network, metaMaskConnected, token_balance, contract_address, toggleTokenTransfer, transfer_toggle } = this.props; 
        return (
            <div>
                {!metaMaskConnected 
                ?
                (<div className='main-dashboard-container'>
                <div className='upper-dashboard-container'>
                    <div className='network-container'>
                        <p className='network-warning-text'>*Please make sure that you are connected to the <Link to='/about' className='ropsten-info-text'>Ropsten Network</Link></p>
                        <h3>Email: $ {email}</h3>
                    </div>
                    <div className='dashboard-buttons'>
                        <Link to='/about'><button className='btn'>{'<Learn More/>'}</button></Link>
                        <button className='btn red-btn' onClick={this.logout}>{'<Logout/>'}</button>
                    </div>
                    <nav className='navbar-container'>
                        <div className='navbar-icon' onClick={this.toggleMenu}>
                            &#9776; 
                            </div>
                            <div className='menu-container'>
                            <ul className={this.state.menuToggle? 
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
                <div className='mm-sentences'>
                    <p>Welcome to CryptoClicker, a website that allows you to tokenize your in game currency.</p> <p className='second-mm-sentence'>Begin by connecting your MetaMask account <span role="img" aria-label='fox-emoji' >🦊</span>.</p>
                    <button className='btn mm-btn' onClick={this.connectMetaMask}>{'<Connect MM/>'}</button>
                </div>
                <div className='delete-button'>
                    <Link to='/delete'><button className='btn red-btn'>{'<Delete Account/>'}</button></Link>
                </div>
            </div>)
            :
            (<div className='main-dashboard-container'>
                <div className='upper-dashboard-container'>
                    <div className='network-container'>
                        <p className='network-warning-text'>*Please make sure that you are connected to the <Link to='/about' className='ropsten-info-text'>Ropsten Network</Link></p>
                        <div className='user-eth-info'>
                        <h3>Email: $ {email}</h3>
                        <h3>Network: {network}</h3>
                        <h3>Token Contract: <a target="_blank" rel="noopener noreferrer" href={`https://ropsten.etherscan.io/token/${contract_address}`}>{contract_address}</a></h3>
                        <h3>User Address: <a target="_blank" rel="noopener noreferrer" href={`https://ropsten.etherscan.io/address/${address}`}>{address}</a></h3>
                        <h3>Token Balance: {token_balance}</h3>
                        </div>
                    </div>
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
                                <ul className={this.state.menuToggle? 
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
                    {/* User can toggle to view and transfer CCLT tokens out of their MetaMask addres. */}
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
};

function mapStateToProps(state) {
    return state; 
};

export default connect(mapStateToProps, {setAddress, setNetwork, setMetaMask, setTokenBalance, toggleTokenTransfer, setInitialState})(Dashboard); 