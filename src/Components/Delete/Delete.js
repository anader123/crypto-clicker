import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import './Delete.css';
import swal from 'sweetalert';

class Delete extends Component {
    constructor() {
        super(); 
        
        this.state = {
            password: '',
        }
    };

    componentDidMount() {
    // Makes sure that the user can't access the delete page if they aren't logged in. 
        axios.get('/auth/check_session')
            .then({

            })
            .catch(() => {
                this.props.history.push('/')
            })
    };

    // User's password is required for them to delete their account. 
    deleteAccount = (event) => {
        event.preventDefault();
        axios.post(`/auth/delete/${this.props.user_id}`, {password: this.state.password, email: this.props.email})
            .then(() => {
                swal({
                    icon: "success",
                    title: "Account Deleted",
                    timer: 15000,
                    text: `Your account has been deleted.`
                    })
                this.props.history.push('/');
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
                <p className='delete-page-text'>Email: {this.props.email}</p>
                <form>
                    <input className='input-box'
                            placeholder='Enter your password'
                            type='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}/> 
                </form>
                <div className='delete-page-buttons'>
                    <button className='btn red-btn delete-btn' onClick={this.deleteAccount}>{'<Delete Account/>'}</button>
                    <Link to='/dashboard'><span className='link-span'>Cancel</span></Link>
                </div>
                
            </div>
        )
    }
};

function mapStateToProps(state) {
    return state
};

export default connect(mapStateToProps)(Delete); 