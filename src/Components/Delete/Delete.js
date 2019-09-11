import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'; 

class Delete extends Component {
    constructor() {
        super(); 
        //TODO: 
        // Do I need to clear state of password in the .then? 
        this.state = {
            password: '',
        }
    };

    deleteAccount = () => {
        axios.delete(`/auth/delete/${this.props.user_id}`, {password: this.state.password})
            .then(() => {
                this.props.history.push('/');
                this.setState({
                    password: '' 
                })
            })
    };

    cancelDelete = () => {
        this.props.history.push('/dashboard');
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        return (
            <div>
                <h3>Are you sure that you want to delete your account?</h3>
                <p>Please enter your password below to confirm that you would like to delete your account.</p>
                <input type='password'
                        name='password'
                        value={this.state.password}
                        onChnage={this.handleChange}/> 
                <button onClick={this.deleteAccount}>Delete Account</button>
                <button onClick={this.cancelDelete}>Cancel</button>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return state
};

export default connect(mapStateToProps)(Delete); 