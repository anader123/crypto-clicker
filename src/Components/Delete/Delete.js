import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'; 

class Delete extends Component {
    constructor() {
        super(); 
        //TODO: 
        // Do I need to clear state of password in the .then? 
        this.state = {
            password: '',
        }
    };

    deleteAccount = () => {
        console.log(this.state.password, this.props.email)
        axios.post(`/auth/delete/${this.props.user_id}`, {password: this.state.password, email: this.props.email})
            .then(() => {
                this.props.history.push('/');
                this.setState({
                    password: '' 
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

    cancelDelete = () => {
        this.props.history.push('/dashboard');
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        return (
            <div>
                <h3>Are you sure that you want to delete your account?</h3>
                <p>Please enter your password below to confirm that you would like to delete your account.</p>
                <input type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}/> 
                <button className='btn' onClick={this.deleteAccount}>Delete Account</button>
                <button className='btn' onClick={this.cancelDelete}>Cancel</button>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return state
};

export default connect(mapStateToProps)(Delete); 