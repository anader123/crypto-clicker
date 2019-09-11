import React, { Component } from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux'; 

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


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    register = () => {
        const { email, password } = this.state;
        console.log('frontend send')
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
                        <button className='button' onClick={this.register}>Register</button>
                        <button className='button' onClick={this.changeDisplay}>Cancel</button>
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