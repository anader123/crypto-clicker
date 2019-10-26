import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useDispatch } from 'react-redux'; 
import './Home.css';
import swal from 'sweetalert';

export default function Home(props) {
    // React Hooks 
    const [email, setEmail] = useState(''); 
    const [password, setPassword]  = useState(''); 
    const [display, setDisplay] = useState(true);  

    // Redux
    const dispatch = useDispatch(); 
    const setInitialState = (initalState) => dispatch({type: 'SET_INITIAL_STATE', payload: initalState});

    useEffect(() => {
        // Makes sure that the user can't go back to the login page if they are logged in. 
        axios.get('/api/check_session')
            .then(() => {
                props.history.push('/dashboard');
            })
            .catch(err => console.log(err))
    }, [])

    const register = (event) => {
        // Prevents the form from submitting 
        event.preventDefault(); 
        
        if(email.length < 6 || !email.includes('@') || password.length < 5) {
            swal({
                icon: "error",
                title: "Registration Error",
                timer: 15000,
                text: `Please make sure that you entering in a valid email and that your password is at least 5 characters long.`
            })
        }
        else {
            axios.post('/api/register', {email, password})
            .then(res => {
                setInitialState(res.data);
                props.history.push('/dashboard'); 
            })
            .catch(err => console.log(err))
        }
    };

    const login = (event) => {
        // Prevents the form from submitting 
        event.preventDefault(); 

        axios.post('/api/login', {email, password})
            .then(res => {
                setInitialState(res.data);
                props.history.push('/dashboard');
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

    // Toggles between the login and register forms. 
    const changeDisplay = () => {
        setEmail('');
        setPassword(''); 
        setDisplay(!display)
    };

    return (
        <div className='home-container'>
            {
                // Login form 
                display ?
                (<div className='login-container'>
                    <h3 className='login-title typewriter-login'>Login</h3>
                    <form className='input-container'>
                    <label className="login-label">E-Mail Address</label>
                    <input  className='input-box'
                            placeholder='Enter your email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                    <label className="login-label">Password</label>
                    <input  className='input-box'
                            placeholder='Enter your password'
                            type='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </form>
                            <button className='btn login-btn' onClick={login}>{'<Login/>'}</button>
                            <span className='login-span' onClick={changeDisplay}>Create an account</span>
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                        <label className="login-label">Password</label>
                        <input  className='input-box'
                                placeholder='Enter your password'
                                type='password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                                <div>
                                <p className='pasword-warn-text'>*Password requires a min of 5 characters</p>
                                </div>
                    </form>
                            <button className='btn login-btn' onClick={register}>{'<Register/>'}</button>
                            <span className='login-span' onClick={changeDisplay}>Cancel</span>
                </div>)
            }
        </div>
    )
};
