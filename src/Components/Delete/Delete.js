import React, { useState, useEffect } from 'react'; 
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Delete.css';
import swal from 'sweetalert';

export default function Delete(props) {
    const [password, setPassword] = useState('');
    const email = useSelector(state => state.email);
    const user_id = useSelector(state => state.user_id);

    // Makes sure that the user can't access the delete page if they aren't logged in. 
    useEffect((props) => {
        axios.get('/api/check_session')
            .then({})
            .catch(() => {
                props.history.push('/')
            })
    }, []);

    // User's password is required for them to delete their account. 
    const deleteAccount = (event) => {
        event.preventDefault();
        axios.post(`/api/delete/${user_id}`, {password, email})
            .then(() => {
                swal({
                    icon: "success",
                    title: "Account Deleted",
                    timer: 15000,
                    text: `Your account has been deleted.`
                    })
                props.history.push('/');
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

    return (
        <div className='delete-page-container'>
            <h3 className='delete-page-title'>Are you sure that you want to delete your account?</h3>
            <p className='delete-page-text'>Please enter in your password below to confirm that you would like to delete your account.</p>
            <p className='delete-page-text'>Email: {email}</p>
            <form>
                <input className='input-box'
                        placeholder='Enter your password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/> 
            </form>
            <div className='delete-page-buttons'>
                <button className='btn red-btn delete-btn' onClick={deleteAccount}>{'<Delete Account/>'}</button>
                <Link to='/dashboard'><span className='link-span'>Cancel</span></Link>
            </div>
            
        </div>
    )
}
