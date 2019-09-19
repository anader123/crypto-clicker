import React, { Component } from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import './Dashboard.css';
import swal from '@sweetalert/with-react';

// Component for keeping track of user's clicks
import EthClicker from '../EthClicker/EthClicker'; 

// Action Builders
import {setAddress, setNetwork, setMetaMask, setTokenBalance} from '../../redux/reducer'; 

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


    // Makes sure that the user can't go back to the login page if they are logged in. 
    keepOffLogin = () => {
        axios.get('/auth/check_session')
            .then(() => {
            })
            .catch(() => {
                this.props.history.push('/');
            })
    };

    // Enables the website to view the user's MetaMask's adddresses. If the person doesn't have MM installed, it pushes them to the learn more page where they can download it. 
    connectMetaMask = () => {
        if(window.ethereum === undefined) {
            swal({
                icon: "warning",
                title: "MetaMask Required",
                timer: 18000,
                text: `Please download the MetaMask Chrome extension.`
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
                })
                .catch(err => console.log(err))
        }
    };

    // Gets token balance for user's address. The method will return 0 if the user isn't on the Ropsten Network. 
    getTokenBalance = (address) => {
        const { setTokenBalance } = this.props;
            axios.post('/api/tokens', {address})
            .then(res => setTokenBalance(res.data))
            .catch(err => console.log(err))
    };

    // Checks if the user has changed their MetaMask address and updates redux to the new address. 
    checkAccount = () => {setInterval(() => {
        const { address, setAddress } = this.props; 
        const currentAddress = window.web3.eth.accounts[0]; 
        if (currentAddress !== address) {
            setAddress(currentAddress)
            this.getTokenBalance(currentAddress)
        }
    }, 1500)};

    // Checks to see which Ethereum network the user is using in their MetaMask extension. 
    checkNetwork = () => {
        const { setNetwork, setTokenBalance, address } = this.props 
        window.web3.version.getNetwork((err, netId) => {
            switch (netId) {
                case "1":
                setTokenBalance(0);
                return setNetwork('Mainnet')
                case "3":
                this.getTokenBalance(address)
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

    logout = () => {
        const { setMetaMask, history } = this.props; 
        axios.post('/auth/logout', {click_balance: this.props.click_balance})
            .then( () => {
                history.push('/'); 
                setMetaMask(false); 
                this.toggleMenu();
            })
            .catch(err => console.log(err))
    };

    // Slides out the menu for user's that are on mobile. 
    toggleMenu = () => {
        this.setState({
            menuToggle: !this.state.menuToggle 
        })
    }

    render() {
        const { user_id, email, address, network, metaMaskConnected, token_balance } = this.props; 
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
                        <h3>Token Contract: 0x264A0131376cdD61EF0Ab11Cf0Ca3cC9F3f7548C</h3>
                        <h3>User Address: {address}</h3>
                        <h3>Token Balance: {token_balance}</h3>
                        </div>
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
                                    <li onClick={this.toggleMenu}><Link to='/about'>LEARN MORE</Link></li>
                                    <li onClick={this.logout}>LOGOUT</li>
                                    <li onClick={this.toggleMenu}><Link to='/delete'>DELETE ACCOUNT</Link></li>
                                </ul>
                            </div>
                        </nav>
                </div>
                {/* Players will click the eth image to increase their click_balance */}
                <EthClicker getTokenBalance={this.getTokenBalance}/> 
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

export default connect(mapStateToProps, {setAddress, setNetwork, setMetaMask, setTokenBalance})(Dashboard); 