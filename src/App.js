import './App.css';
import Header from './Components/Header/Header'; 
import Footer from './Components/Footer/Footer'; 
import router from './utils/router'; 
import './reset.css';
import './styles/sweetAlerts.css'; 

import React, { Component } from 'react'

class App extends Component {
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
