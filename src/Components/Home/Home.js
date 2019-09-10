import React, { Component } from 'react';
import axios from 'axios'; 

export default class Home extends Component {
    constructor() {
        super(); 

        this.state = {
            email: '', 
            password: '',
            display: true,
            click_balance: 0, 
            // error: false,
            // errorMessage: ''
        }
    };


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    login = () => {
        const { email, password } = this.state; 
        axios.post('/auth/login', {email, password})
            .then(res => {
                this.props.history.push('/dashboard');
                // TODO:
                // will need to set the data to something 
                // might need to have state in App.js
            })
            // .catch(err => {
            //     this.setState({
            //         error: true, 
            //         errorMessage: err.res.data
            //     })
            // })
    };

    register = () => {
        const { email, password } = this.state;
        axios.post('/auth/register', {email, password})
            .then(res => {
                this.props.history.push('/dashboard'); 
                // TODO:
                // will need to set the data to something 
                // might need to have state in App.js
            })
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
                        <input type='email'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleChange}/>
                        <input type='password'
                                name='password'
                                value={this.state.password}
                                onChange={this.handleChange}/>
                        <button className='button' onClick={this.login}>Login</button>
                        <button className='button' onClick={this.changeDisplay}>Register</button>
                    </div>)
                    :
                    (<div className='register-contaier'>
                        <input type='email'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleChange}/>
                        <input type='password'
                                name='password'
                                value={this.state.password}
                                onChange={this.handleChange}/>
                        <button className='button' onClick={this.login}>Register</button>
                        <button className='button' onClick={this.changeDisplay}>Cancel</button>
                    </div>)
                }
            </div>
        )
    }
};