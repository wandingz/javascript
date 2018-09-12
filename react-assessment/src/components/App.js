import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Nav from './Nav';
import PageNotFound from './PageNotFound';
import ProtectedRoute from './ProtectedRoute';

import Register from './user/Register';
import Login from './user/Login';

import CreateRequest from './request/Create';
import ListRequest from './request/List';

class App extends Component {

    render() {
        return (
            <div>
                <Nav />
                <Switch>
                    <ProtectedRoute path='/' component={Home} exact={true} />
                    <ProtectedRoute path='/createRequest' component={CreateRequest} />
                    <ProtectedRoute path='/listRequest' component={ListRequest} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;