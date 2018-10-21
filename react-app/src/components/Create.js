import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import { withRouter } from 'react-router-dom';
import { Prompt } from 'react-router'
import { addUser } from '../redux/actions/user';

class Create extends Component {
    state = {
        valid: false,
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // e.persist();
        var user = serializeForm(e.target, { hash: true });
        this.setState({ valid: true }, () => {
            this.props.store.dispatch(addUser(user));
            this.props.history.push('/user');
        });
    }
    // componentDidMount() {
    //     this.setState({ users: this.props.store.getState() });
    //     this.props.store.subscribe(() => {
    //         this.setState({ users: this.props.store.getState() });
    //     });
    // }
    handleInput = (e) => {
        console.log(e.target.name)
    }
    render() {
        return <div>
            <Prompt when={!this.state.valid} message="Are you sure you want to leave?" />
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type='text' onChange={this.handleInput} placeholder='Username' name='username' />
                </div>
                <div>
                    <input type='text' onChange={this.handleInput} placeholder='Location' name='location' />
                </div>
                <button>Save</button>
            </form>
        </div>
    }
}

export default withRouter(Create);