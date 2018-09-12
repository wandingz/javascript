import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Profile from './Profile';
import User from './User';
import Form from './Form';
import Nav from './Nav';
import Detail from './Detail';
import PageNotFound from './PageNotFound';
import Create from './Create';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';

class App extends Component {

    render() {
        return (
            <div>
                <Nav />
                <Switch>
                    <Route path='/' component={Home} exact={true} />
                    <Route path='/register' component={Register} />
                    <Route path='/profile' component={Profile} />
                    <ProtectedRoute path='/user' render={() => <User />} />
                    <ProtectedRoute path='/create' render={() => <Create store={this.props.store} />} />
                    <Route path='/details/:username' component={Detail} />
                    <Route path='/details2/:username' render={() => <Detail />} />
                    {/* <Route path='/details2/:username' render={(history, match) => <Detail history={history} match={match}/>} /> */}
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;