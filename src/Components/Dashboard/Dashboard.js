import React, { Component } from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import './Dashboard.css';
import ethLogo from '../../img/ethlogo.png';
import swal from 'sweetalert';

// Action Builder
import {incrementClick, resetCount, setAddress} from '../../redux/reducer'; 

class Dashboard extends Component {
    constructor() {
        super(); 

        this.state = {
            metaMaskConnected: false,
            ethBalance: 0
        }
    }

    componentDidMount() {
        axios.get('/auth/check_session')
            .then(() => {
            })
            .catch(() => {
                this.props.history.push('/');
            })
    };

    // TODO: have a function that runs every so after that stores state to the session
    // componentDidUpdate() {
        // Don't use SetInterval 
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
                    this.props.setAddress(response[0])
                    swal({
                        icon: "success",
                        title: "MetaMask Connected 🦊",
                        timer: 150000,
                        text: `Address: ${response[0]}`
                      })
                    this.handleMMToggle();
                    // this.checkAccount();
                })
                .catch(err => console.log(err))
        }
    };

    // const getBalance = async () => {
    //     await window.web3.eth.getBalance(this.props.address)
    //     this.setState({
    //         ethBalance: getBalance
    //     })
    // }
    
    // FIXME: Need to fix this
    // checkAccount = setInterval(() => {
    //     console.log('checking address')
    //     const { address } = this.props
    //     if (window.web3.eth.accounts[0] !== address) {
    //         this.props.setAddress(window.web3.eth.accounts[0])
    //         this.componentDidUpdate(); 
    //     }
    // }, 100);

    exchangeClicks = () => {
        axios.post('/api/exchanage', {click_balance: this.props.click_balance, address: this.props.address})
            .then((res) => {
                swal({
                    icon: "success",
                    title: "Clicks Successfully Exchanged",
                    timer: 20000,
                    text: `Transaction Hash: ${res.data}`
                  })
                this.props.resetCount();
            })
            .catch(() => {
                swal({
                    icon: "error",
                    title: "Exchange Error",
                    timer: 20000,
                    text: `You must have at least 50 clicks before being able to tokenzie.`
                  })
            })
    };

    logout = () => {
        axios.post('/auth/logout', {click_balance: this.props.click_balance})
            .then( () => {
                this.props.history.push('/'); 
            })
            .catch(err => console.log(err))
    };

    handleMMToggle = () => {
        this.setState({
            metaMaskConnected: !this.state.metaMaskConnected 
        })
    }

    render() {
        const { user_id, email, click_balance, incrementClick, address } = this.props; 
        const { metaMaskConnected } = this.state; 
        return (
            <div>
                {!metaMaskConnected 
                ?
                (<div className='main-dashboard-container'>
                <div className='upper-dashboard-container'>
                    <div className='network-container'>
                        <h3>Email: $ {email}</h3>
                        <h3>Network: $ ropsten</h3>
                        {/* TODO: change link to opensea and have their logo */}
                            {/* <img className='kitty-profile-pic' alt='kitty pic' src={`https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${user_id}.png`}></img> */}
                    </div>
                    <div className='dashboard-buttons'>
                        <Link to='/about'><button className='btn'>{'<About/>'}</button></Link>
                        <button className='btn red-btn' onClick={this.logout}>{'<Logout/>'}</button>
                </div>
                </div>
                <div className='mm-sentences'>
                    <p>Welcome to CryptoClicker, a website that allows you to tokenize your in game currency.</p> <p className='second-mm-sentence'>Begin by connecting your MetaMask account 🦊.</p>
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
                        <h3>Email: $ {email}</h3>
                        <h3>Network: ropsten</h3>
                        {/* TODO: change link to opensea and have their logo */}
                            {/* <img className='kitty-profile-pic' alt='kitty pic' src={`https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${user_id}.png`}></img> */}
                        <h3>Address: {address}</h3>
                    </div>
                    <div className='dashboard-buttons'>
                        <Link to='/about'><button className='btn'>{'<About/>'}</button></Link>
                        <button className='btn red-btn' onClick={this.logout}>{'<Logout/>'}</button>
                </div>
                </div>
                <div className='mid-dashboard-container'>
                    <div className='clicker-container'>
                        <h3 className='click-balance'>Click Balance: {click_balance}</h3>
                        <img className='eth-click' src={ethLogo} alt='eth logo' onClick={() => incrementClick(click_balance)}/>
                    </div>
                    <div className='user-info-container'>
                        <h3>Clicker Token: </h3>
                        <h3>ETH: </h3>
                        {/* Add Token and ETH balance */}
                        <button className='btn' onClick={this.exchangeClicks}>{'<Exchange Clicks/>'}</button>
                    </div>
                </div>
                {/* min number of clicks should be 50 to exchange */}
                {/* maybe make it it's own component to let them choose how much to exchange? */}
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

export default connect(mapStateToProps, {incrementClick, resetCount, setAddress})(Dashboard); 