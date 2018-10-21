import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

import App from './components/app';

export default class extends Component {

    render() {
        return <Switch>
            <Route path='/' component={App} exact={true} />
            <Route path='/client' component={App} exact={true} />
        </Switch>
    }
}

