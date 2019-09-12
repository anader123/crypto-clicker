import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'; 
import './Delete.css';

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
        console.log(this.state.password, this.props.email)
        axios.post(`/auth/delete/${this.props.user_id}`, {password: this.state.password, email: this.props.email})
            .then(() => {
                this.props.history.push('/');
                this.setState({
                    password: '' 
                })
            })
    };

    // TODO: Keeping this here to show that I had a delete
    // deleteAccount = () => {
    //     axios.delete(`/auth/delete/${this.props.user_id}`)
    //         .then(() => {
    //             this.props.history.push('/');
    //             this.setState({
    //                 password: '' 
    //             })
    //         })
    // };

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
            <div className='delete-page-container'>
                <h3 className='delete-page-title'>Are you sure that you want to delete your account?</h3>
                <p>Please enter your password below to confirm that you would like to delete your account.</p>
                <input className='input-box'
                        placeholder='Enter your password'
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}/> 
                <div className='delete-page-buttons'>
                    <button className='btn red-btn' onClick={this.deleteAccount}>Delete Account</button>
                    <span className='span' onClick={this.cancelDelete}>Cancel</span>
                </div>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return state
};

export default connect(mapStateToProps)(Delete); 