import './App.css';
import Header from './Components/Header/Header'; 
import Footer from './Components/Footer/Footer'; 
import router from './utils/router'; 
import './reset.css';
import './styles/sweetAlerts.css'; 

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
          <Footer/> 
        </div>
      )
    }
  }


export default App;
