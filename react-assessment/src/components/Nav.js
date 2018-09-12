import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import './Nav.css';
import { logout } from '../redux/actions/user';

function ActivableNavLink(props) {
    return <NavLink className="link" activeClassName="link link-active" {...props} >{props.children}</NavLink>
}

class Nav extends Component {
    handleLogout = () => {
        this.props.dispatch(logout());
    }
    render() {
        if (this.props.user.isLoggedIn) {
            return (
                <div className="nav">
                    <ActivableNavLink to='/' exact >Home</ActivableNavLink>{' | '}
                    <ActivableNavLink to='/createRequest' >Create request</ActivableNavLink>{' | '}
                    <ActivableNavLink to='/listRequest' >List request</ActivableNavLink>{' | '}
                    <Button className="link asLink" onClick={this.handleLogout}>Logout</Button>
                </div>
            );
        } else {
            return (
                <div className="nav">
                    <ActivableNavLink to='/login' >Login</ActivableNavLink>{' | '}
                    <ActivableNavLink to='/register' >Register</ActivableNavLink>
                </div>
            );
        }
    }
}

export default withRouter(connect(data => ({ user: data.user }))(Nav));
/**
 * To Deal with Update Blocking (location change does not trigger NavLink rerender)
 * Quick Solution, but not the most efficient solution.
 * See: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md#the-solution
 */