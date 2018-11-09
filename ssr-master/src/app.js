import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

import routes from './routes';

export default class extends Component {

    render() {
        return <Switch>
            {routes.map(route => <Route {...route} key={route.path}/>)}
        </Switch>
    }
}

