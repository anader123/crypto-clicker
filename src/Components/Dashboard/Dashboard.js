import React, { Component } from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux'; 

// Action Builder
import {incrementClick} from '../../redux/reducer'; 

class Dashboard extends Component {

    logout = () => {
        axios.post('/auth/logout', {click_balance: this.props.click_balance})
            .then( res => {
                this.props.history.push('/'); 
            })
    };

    updateClicks = () => {
        axios.post()
    };

    deletePage = () => {
        this.props.history.push('/delete');         
    };

    render() {
        return (
            <div>
                <img alt='robo pic' src={`https://robohash.org/${this.props.email}.png`}></img>
                <h3>{this.props.email}</h3>
                <h3>{this.props.click_balance}</h3>
                <button onClick={() => this.props.incrementClick(this.props.click_balance)}>Click Me</button>
                {/* min number of clicks should be 50 to exchange */}
                {/* maybe make it it's own component? */}
                <button>Exchange Clicks</button>
                <button onClick={this.logout}>Logout</button>
                <button onClick={this.deletePage}>Delete Account</button>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return state; 
};

export default connect(mapStateToProps, {incrementClick})(Dashboard); 