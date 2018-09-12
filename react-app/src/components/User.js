import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { removeUser, getUsers } from '../redux/actions/user';
import { userlistService } from '../service/userlistService';

class User extends Component {
    state = {
        users: [],
    }

    deleteUser = (user) => {
        // this.props.store.dispatch(removeUser(user));
    }

    unsubscribe = undefined;
    
    componentDidMount() {
        // userlistService.getUsers()
        // this.subscription = userlistService.$users.subscribe(users => {
        //     this.setState({ users: users });
        // });
        // console.log(this.props);
        this.props.dispatch(getUsers());
        // this.setState({ users: this.props.users });
        // this.unsubscribe = this.props.store.subscribe(() => {
        //     this.setState({ users: this.props.store.getState() });
        // });
    }

    componentWillUnmount() {
        // this.subscription.unsubscribe();
        // this.unsubscribe();
    }

    render() {
        return (
            <div>
                <h2>{this.state.pageTitle}</h2>
                <ul>
                    {this.props.users.map((u, i) => (
                        <li key={i}>
                            {u.username} |
                            {u.location} |
                            <Link to={'/details/' + u.username}>Details</Link>
                            <button onClick={() => this.deleteUser(u)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default connect(data => ({users: data}))(withRouter(User));

/**
 * designation / domains
 * stacks MEAN / MERN stack
 * angular 2/4 angular JS
 * REACT
 * NodeJS/MongoDB
 * JacaScript
 *      design pattern
 *      DOM closure / prototypes
 * jQuery
 *      DOM event ajax support
 * Bootstrap / CSS
 * Task runner -> gulp/grunt
 * CSS preprocessors LESS / SASS
 * AWS
 */

 /**
  * sep 10-14 : 8-16
  */