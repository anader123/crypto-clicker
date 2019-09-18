import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import './Delete.css';
import swal from 'sweetalert';

class Delete extends Component {
    constructor() {
        super(); 
        //TODO: 
        // Do I need to clear state of password in the .then? 
        this.state = {
            password: '',
        }
    };

    componentDidMount() {
        axios.get('/auth/check_session')
            .then({

            })
            .catch(() => {
                this.props.history.push('/')
            })
    };

    // User's password is required for them to delete their account. 
    deleteAccount = () => {
        axios.post(`/auth/delete/${this.props.user_id}`, {password: this.state.password, email: this.props.email})
            .then(() => {
                swal({
                    icon: "success",
                    title: "Account Deleted",
                    timer: 15000,
                    text: `Your account has been deleted.`
                    })
                this.props.history.push('/');
                this.setState({
                    password: '' 
                })
            })
            .catch(() => {
                swal({
                    icon: "error",
                    title: "Incorrect Password",
                    timer: 15000,
                    text: `Please make sure that you are entering the corret password.`
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

    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        return (
            <div className='delete-page-container'>
                <h3 className='delete-page-title'>Are you sure that you want to delete your account?</h3>
                <p className='delete-page-text'>Please enter in your password below to confirm that you would like to delete your account.</p>
                <input className='input-box'
                        placeholder='Enter your password'
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}/> 
                <div className='delete-page-buttons'>
                    <button className='btn red-btn delete-btn' onClick={this.deleteAccount}>{'<Delete Account/>'}</button>
                    <Link to='/dashboard'><span className='link-span' onClick={this.cancelDelete}>Cancel</span></Link>
                </div>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return state
};

export default connect(mapStateToProps)(Delete); 