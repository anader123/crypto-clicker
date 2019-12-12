import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './Delete.css';

// Alerts
import { accountDeletedSuccessAlert, incorrectPasswordAlert } from '../../utils/alerts';

class Delete extends Component {
    constructor() {
        super();
        
        this.state = {
            password: ''
        }
    }

    componentDidMount = async () => {
        try {
            await axios.get('/api/check_session')
        } 
        catch {
                this.props.history.push('/')
        };
    }

    deleteAccount = async event => {
        const { user_id, email } = this.props;
        const { password } = this.state;
        event.preventDefault();
        try {
            if(password !== '') {
                await axios.post(`/api/delete/${user_id}`, {password, email})
                accountDeletedSuccessAlert();
                this.props.history.push('/');
            }
            else {
                incorrectPasswordAlert();
            }
        } 
        catch (error) {
            console.log(error);
            incorrectPasswordAlert();
        };
    }

    render() {
        const { email } = this.props;
        const { password } = this.state;
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
                        onChange={(e) => this.setState({ password: e.target.value })}/> 
            </form>

            <div className='delete-page-buttons'>
                <button className='btn red-btn delete-btn' onClick={this.deleteAccount}>{'<Delete Account/>'}</button>
                <Link to='/dashboard'><span className='link-span'>Cancel</span></Link>
            </div>
            
        </div>
        )
    }
}

function mapStateToProps(state) {
    return state; 
}

export default connect(mapStateToProps)(Delete); 