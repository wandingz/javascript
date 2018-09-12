import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { authService } from '../service/authService';

class Nav extends Component {
    render() {
        return (
            <div>
                <NavLink className="btn" activeClassName="btn-primary" to='/' exact={true}>Home</NavLink>
                <NavLink className="btn" activeClassName="btn-primary" to='/profile'>Profile</NavLink>
                {authService.checkUserStatus() && <NavLink className="btn" activeClassName="btn-primary" to='/user'>Users</NavLink>}
                {authService.checkUserStatus() && <NavLink className="btn" activeClassName="btn-primary" to='/create'>Create</NavLink>}

                <NavLink className="btn" activeClassName="btn-primary" to='/register'>Register</NavLink>
            </div>
        );
    }
}

export default Nav;