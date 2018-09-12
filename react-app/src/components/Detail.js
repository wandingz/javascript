import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Detail extends Component {
    render() {
        return <div>
            <div>Details</div>
            <div>{this.props.match.params.username}</div>
            <button onClick={() => this.props.history.push('/user')} >back</button>
        </div>
    }
}

export default withRouter(Detail);