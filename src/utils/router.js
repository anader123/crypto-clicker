import React from 'react';
import { Switch, Route } from 'react-router-dom'; 

import Home from '../Components/Home/Home';
import Dashboard from '../Components/Dashboard/Dashboard';
import AboutMM from '../Components/AboutMM/AboutMM'; 
import Delete from '../Components/Delete/Delete'; 

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/about' component={AboutMM}/>
        <Route path='/delete' component={Delete}/>
    </Switch>
);