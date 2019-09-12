import React, { Component } from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import './Home.css';

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
            // error: false,
            // errorMessage: ''
        }
    };

    componentDidMount() {

    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    register = () => {
        const { email, password } = this.state;
        if(email.length < 6 || !email.includes('@') || password.length < 5) {
            console.log('please make sure that you are entering in an email')
        }
        else {
            axios.post('/auth/register', {email, password})
            .then(res => {
                this.props.setInitialState(res.data);
                this.props.history.push('/dashboard'); 
            })
            .catch(err => console.log(err))
            // .catch(err => {
            //     this.setState({
            //         error: true, 
            //         errorMessage: err.res.data
            //     })
            // })
        }
    };

    login = () => {
        const { email, password } = this.state; 
        axios.post('/auth/login', {email, password})
            .then(res => {
                this.props.setInitialState(res.data);
                this.props.history.push('/dashboard');
            })
            .catch(err => console.log(err))
            // .catch(err => {
            //     this.setState({
            //         error: true, 
            //         errorMessage: err.res.data
            //     })
            // })
    };

    changeDisplay = () => {
        this.setState({
            display: !this.state.display,
            email: '',
            password: '',
            // error: false,
            // errorMessage: ''
        })
    };

    render() {
        return (
            <div className='home-container'>
                {
                    this.state.display ?
                    (<div className='login-container'>
                        <h3 className='login-title'>Login</h3>
                        <div>
                        <label className="login-label">E-Mail Address</label>
                        </div>
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
                            <div className='login-button-container'>
                                <button className='btn login-btn' onClick={this.login}>Login</button>
                                <span className='login-span' onClick={this.changeDisplay}>Create an account</span>
                            </div>
                    </div>)
                    :
                    (<div className='login-container'>
                        <h3 className='login-title'>Sign Up</h3>
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
                            <div className='login-button-container'>
                                <button className='btn login-btn' onClick={this.register}>Register</button>
                                <span className='login-span' onClick={this.changeDisplay}>Cancel</span>
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

export default connect(mapStateToProps, {setInitialState})(Home); 