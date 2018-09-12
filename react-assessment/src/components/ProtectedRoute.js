import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends Component {
    render() {
        if (this.props.user.isLoggedIn) {
            return (
                <Route path={this.props.path} render={this.props.render} component={this.props.component} />
            );
        } else {
            return <Redirect to='/login' />;
        }
    }
}

export default withRouter(connect(data => ({ user: data.user }))(ProtectedRoute));