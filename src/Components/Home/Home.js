import React, { Component } from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import './Home.css';
import swal from 'sweetalert';

// Action Builder
import {setInitialState} from '../../redux/reducer'; 

class Home extends Component {
    constructor() {
        super(); 

        this.state = {
            email: '', 
            password: '',
            display: true,
            clickTokens: null,
            ethBalance: null 
        }
    };

    // Makes sure that the user can't go back to the login page if they are logged in. 
    componentDidMount() {
        axios.get('/auth/check_session')
            .then(() => {
                this.props.history.push('/dashboard');
            })
            .catch(err => console.log(err))
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    register = (event) => {
        // Prevents the form from submitting 
        event.preventDefault(); 
        
        const { email, password } = this.state;
        if(email.length < 6 || !email.includes('@') || password.length < 5) {
            swal({
                icon: "error",
                title: "Registration Error",
                timer: 15000,
                text: `Please make sure that you entering in a valid email and that your password is at least 5 characters long.`
            })
        }
        else {
            axios.post('/auth/register', {email, password})
            .then(res => {
                this.props.setInitialState(res.data);
                this.props.history.push('/dashboard'); 
            })
            .catch(err => console.log(err))
        }
    };

    login = (event) => {
        // Prevents the form from submitting 
        event.preventDefault(); 

        const { email, password } = this.state; 
        axios.post('/auth/login', {email, password})
            .then(res => {
                this.props.setInitialState(res.data);
                this.props.history.push('/dashboard');
            })
            .catch(() => {
                swal({
                icon: "error",
                title: "Login Error",
                timer: 15000,
                text: `Invalid Credentials: Please make sure that you entering in the correct email and password.`
                })
            })
    };

    // Toggles between the login and sign up fields. 
    changeDisplay = () => {
        this.setState({
            display: !this.state.display,
            email: '',
            password: ''
        })
    };

    render() {
        return (
            <div className='home-container'>
                {
                    // Login form 
                    this.state.display ?
                    (<div className='login-container'>
                        <h3 className='login-title typewriter-login'>Login</h3>
                        <form className='input-container'>
                        <label className="login-label">E-Mail Address</label>
                        <input  className='input-box'
                                placeholder='Enter your email'
                                type='email'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleChange}/>
                        <label className="login-label">Password</label>
                        <input  className='input-box'
                                placeholder='Enter your password'
                                type='password'
                                name='password'
                                value={this.state.password}
                                onChange={this.handleChange}/>
                        </form>
                                <button className='btn login-btn' onClick={this.login}>{'<Login/>'}</button>
                                <span className='login-span' onClick={this.changeDisplay}>Create an account</span>
                    </div>)
                    :
                    // Register form 
                    (<div className='login-container'>
                        <h3 className='login-title typewriter-login'>Register</h3>
                        <form className='input-container'>
                            <label className="login-label">E-Mail Address</label>
                            <input  className='input-box'
                                    placeholder='Enter your email'
                                    type='email'
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}/>
                            <label className="login-label">Password</label>
                            <input  className='input-box'
                                    placeholder='Enter your password'
                                    type='password'
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}/>
                                    <div>
                                    <p className='pasword-warn-text'>*Password requires a min of 5 characters</p>
                                    </div>
                        </form>
                                <button className='btn login-btn' onClick={this.register}>{'<Register/>'}</button>
                                <span className='login-span' onClick={this.changeDisplay}>Cancel</span>
                    </div>)
                }
            </div>
        )
    }
};

function mapStateToProps(state) {
    return state; 
};

export default connect(mapStateToProps, {setInitialState})(Home); 