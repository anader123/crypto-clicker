import React, { Component } from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import './Home.css';
import swal from 'sweetalert';
import ethLogo from '../../img/ethlogo.png';

// Action Builder
import {setInitialState} from '../../redux/reducer'; 

class Home extends Component {
    constructor() {
        super(); 
        //TODO: 
        // Do I need to clear state of password in the .then? 
        this.state = {
            email: '', 
            password: '',
            display: true,
            clickTokens: null,
            ethBalance: null 
        }
    };

    componentDidMount() {
        // Makes sure that the user can't acess the dashboard page if they aren't logged in. 
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

    register = () => {
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

    login = () => {
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
                        {/* <div>
                            <img className='eth-logo' src={ethLogo} alt='eth logo'/>
                        </div> */}
                        <h3 className='login-title typewriter-login'>Login</h3>
                        <div className='input-container'>
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
                        </div>
                                <button className='btn login-btn' onClick={this.login}>{'<Login/>'}</button>
                                <span className='login-span' onClick={this.changeDisplay}>Create an account</span>
                    </div>)
                    :
                    // Register form 
                    (<div className='login-container'>
                        <h3 className='login-title typewriter-login'>Sign Up</h3>
                            {/* <img className='eth-logo' src={ethLogo} alt='eth logo'/> */}
                        <div className='input-container'>
                            <label className="login-label">E-Mail Address</label>
                            <input  className='input-box'
                                    placeholder='Enter your email'
                                    type='email'
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}/>
                            <label className="login-label">Password</label>
                            <input  className='input-box'
                                    placeholder='Enter your password (min of 5 characters)'
                                    type='password'
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}/>
                        </div>
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