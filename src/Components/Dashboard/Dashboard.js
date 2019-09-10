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
    }

    render() {
        return (
            <div>
                <h3>{this.props.click_balance}</h3>
                <h3>{this.props.email}</h3>
                <button onClick={() => this.props.incrementClick(this.props.click_balance)}>Click Me</button>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return state; 
};

export default connect(mapStateToProps, {incrementClick})(Dashboard); 