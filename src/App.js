import './App.css';
import Header from './Components/Header/Header'; 
import router from './utils/router'; 

import React, { Component } from 'react'

class App extends Component {
//     constructor() {
//       super(); 

//       this.state = {
//         click_balance: 0, 
//         email: ''
//       }
//     };

// // TODO: 
// // will need to figure out a way to pass this down into routes
// updateUserInfo = (click_balance, email) => {
//     this.setState({
//       click_balance, 
//       email
//     })
//   }
    render() {
      return (
        <div className='App'>
          <Header/>
          {router}
        </div>
      )
    }
  }


export default App;
