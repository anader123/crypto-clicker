import React, { Component } from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import './Dashboard.css';

// Action Builder
import {incrementClick, resetCount, setAddress} from '../../redux/reducer'; 

class Dashboard extends Component {

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

    render() {
        const { user_id, email, click_balance, incrementClick, address } = this.props; 
        return (
            <div>
                {/* TODO: change link to opensea and have their logo */}
                {/* <img className='kitty-profile-pic' alt='kitty pic' src={`https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${user_id}.png`}></img> */}
                <h3>Network: Ropsten</h3>
                <h3>{email}</h3>
                <h3>{click_balance}</h3>
                <h3>Address: {address}</h3>
                <button className='btn' onClick={() => incrementClick(click_balance)}>Click Me</button>
                {/* min number of clicks should be 50 to exchange */}
                {/* maybe make it it's own component to let them choose how much to exchange? */}
                <button className='btn' onClick={this.exchangeClicks}>Exchange Clicks</button>
                <button className='btn' onClick={this.logout}>Logout</button>
                <button className='btn' onClick={this.deletePage}>Delete Account</button>
                <button className='btn' onClick={this.connectMetaMask}>Connect MM</button>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return state; 
};

export default connect(mapStateToProps, {incrementClick, resetCount, setAddress})(Dashboard); 