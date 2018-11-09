import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Nav from './Nav';
import PageNotFound from './PageNotFound';
import ProtectedRoute from './ProtectedRoute';
import OpeningCrawContainer from './starwar/OpeningCrawContainer'

import Register from './user/Register';
import Login from './user/Login';
import HighchartsComponent from './Highcharts';

import CreateRequest from './request/Create';
import ListRequest from './request/List';
import UploadFile from './upload/Upload';
import Test from './Test';

class App extends Component {

    render() {
        return (
            <div>
                <Nav />
                <Switch>
                    <ProtectedRoute path='/' component={Home} exact={true} />
                    <ProtectedRoute path='/createRequest' component={CreateRequest} />
                    <ProtectedRoute path='/listRequest' component={ListRequest} />
                    <ProtectedRoute path='/highcharts' component={HighchartsComponent} />
                    <ProtectedRoute path='/starwar' component={OpeningCrawContainer} />
                    <Route path='/uploadFile' component={UploadFile} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/test/' component={Test} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;