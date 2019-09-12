import React, { Component } from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import './Dashboard.css';
import ethLogo from '../../img/ethlogo.png';

// Action Builder
import {incrementClick, resetCount, setAddress} from '../../redux/reducer'; 

class Dashboard extends Component {
    constructor() {
        super(); 

        this.state = {
            metaMaskConnected: false
        }
    }

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
            this.props.history.push('/about'); 
        }
        else {
            window.ethereum.enable()
                .then((response) => {
                    this.props.setAddress(response[0])
                })
                .catch(err => console.log(err))
        }
        this.handleMMToggle();
    };

    exchangeClicks = () => {
        axios.post('/api/exchanage', {click_balance: this.props.click_balance, address: this.props.address})
            .then((res) => {
                console.log(res)
                this.props.resetCount();
            })
            .catch(err => console.log(err))
    };

    logout = () => {
        axios.post('/auth/logout', {click_balance: this.props.click_balance})
            .then( () => {
                this.props.history.push('/'); 
            })
            .catch(err => console.log(err))
    };

    
    deletePage = () => {
        this.props.history.push('/delete');         
    };

    aboutPage = () => {
        console.log('hit')
        this.props.history.push('/about');         
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
                    <div>
                        <h3 className='network-container'>Network: Ropsten</h3>
                        {/* TODO: change link to opensea and have their logo */}
                            {/* <div className='kitty-profile-pic' style={{backgroundImage: `https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${user_id}.png`}}></div> */}
                        <h3>Email: {email}</h3>
                    </div>
                    <div className='dashboard-buttons'>
                        <button className='btn' onClick={this.aboutPage}>About</button>
                        <button className='btn' onClick={this.connectMetaMask}>Connect MM</button>
                        <button className='btn red-btn' onClick={this.logout}>Logout</button>
                </div>
                </div>
                <div className='mid-dashboard-container'>
                    <div className='clicker-container'>
                        <h3 className='click-balance'>Click Balance: {click_balance}</h3>
                        <img className='eth-click' src={ethLogo} alt='eth logo' onClick={() => incrementClick(click_balance)}/>
                    </div>
                </div>
                {/* min number of clicks should be 50 to exchange */}
                {/* maybe make it it's own component to let them choose how much to exchange? */}
                <div className='delete-button'>
                    <button className='btn red-btn' onClick={this.deletePage}>Delete Account</button>
                </div>
            </div>)
            :
            (<div className='main-dashboard-container'>
                <div className='upper-dashboard-container'>
                    <div>
                        <h3 className='network-container'>Network: Ropsten</h3>
                        {/* TODO: change link to opensea and have their logo */}
                            {/* <img className='kitty-profile-pic' alt='kitty pic' src={`https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${user_id}.png`}></img> */}
                        <h3>Email: {email}</h3>
                    </div>
                    <div className='dashboard-buttons'>
                        <button className='btn' onClick={this.aboutPage}>About</button>
                        <button className='btn red-btn' onClick={this.logout}>Logout</button>
                </div>
                </div>
                <div className='mid-dashboard-container'>
                    <div className='clicker-container'>
                        <h3 className='click-balance'>Click Balance: {click_balance}</h3>
                        <img className='eth-click' src={ethLogo} alt='eth logo' onClick={() => incrementClick(click_balance)}/>
                    </div>
                    <div className='user-info-container'>
                        <button className='btn' onClick={this.exchangeClicks}>Exchange Clicks</button>
                        <h3>Address: {address}</h3>
                        {/* Add Token and ETH balance */}
                    </div>
                </div>
                {/* min number of clicks should be 50 to exchange */}
                {/* maybe make it it's own component to let them choose how much to exchange? */}
                <div className='delete-button'>
                    <button className='btn red-btn' onClick={this.deletePage}>Delete Account</button>
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