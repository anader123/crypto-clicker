import React, { Component } from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import EthClicker from '../EthClicker/EthClicker'; 

import './Dashboard.css';
import swal from '@sweetalert/with-react';

// Action Builder
import {setAddress, setNetwork, setMetaMask} from '../../redux/reducer'; 

class Dashboard extends Component {
    // constructor() {
    //     super(); 

    //     this.state = {
    //         ethBalance: 0
    //     }
    // }

    componentDidMount() {
        this.keepOffLogin();
    };

    keepOffLogin = () => {
        axios.get('/auth/check_session')
            .then(() => {
            })
            .catch(() => {
                this.props.history.push('/');
            })
    };

    checkNetwork = () => {
        const { setNetwork } = this.props 
        window.web3.version.getNetwork((err, netId) => {
            switch (netId) {
                case "1":
                return setNetwork('Mainnet')
                case "3":
                return setNetwork('Ropsten')
                case "4":
                return setNetwork('Rinkeby')
                case "42":
                return setNetwork('Kovan')
                default:
                return setNetwork('Unknown Network')
            }
            })
    };

    // TODO: have a function that runs every so after that stores state to the session
    // componentDidUpdate() {
    //     window.setInterval(this.updateClicks(), 10000)
    // };
    // updateClicks = () => {
    //     axios.post('/api/session_balance', {click_balance: this.props.click_balance})
    //         .then( res => {
    //             console.log(res)
    //         })
    //         .catch(err => console.log(err))
    // };

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
                            <p>Address:</p><p>{`${response[0]}`}</p>
                        </div>)
                      })
                    this.checkAccount();
                    this.checkNetwork(); 
                })
                .catch(err => console.log(err))
        }
    };

    // TODO: check eth balance if I have time. 
    // const getBalance = async () => {
    //     await window.web3.eth.getBalance(this.props.address)
    //     this.setState({
    //         ethBalance: getBalance
    //     })
    // }
    
    checkAccount = () => {setInterval(() => {
        const { address } = this.props
        if (window.web3.eth.accounts[0] !== address) {
            this.props.setAddress(window.web3.eth.accounts[0])
        }
    }, 1500)};

 
    logout = () => {
        axios.post('/auth/logout', {click_balance: this.props.click_balance})
            .then( () => {
                this.props.history.push('/'); 
                this.props.setMetaMask(false); 
            })
            .catch(err => console.log(err))
    };

    render() {
        const { user_id, email, address, network, metaMaskConnected } = this.props; 
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
                        <h3>Email: $ {email}</h3>
                        <h3>Network: {network}</h3>
                        <h3>Token Contract: 0x264A0131376cdD61EF0Ab11Cf0Ca3cC9F3f7548C</h3>
                        <h3>User Address: {address}</h3>
                    </div>
                    <div className='dashboard-buttons'>
                        <Link to='/about'><button className='btn'>{'<Learn More/>'}</button></Link>
                        <button className='btn red-btn' onClick={this.logout}>{'<Logout/>'}</button>
                </div>
                </div>
                {/* Players will click the eth image to increase their click_balance */}
                <EthClicker/> 
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

export default connect(mapStateToProps, {setAddress, setNetwork, setMetaMask})(Dashboard); 