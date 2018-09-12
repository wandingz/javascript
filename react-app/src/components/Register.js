import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { InputGroup, Input, Button } from 'reactstrap';

import './Register.css';
import { register } from '../redux/actions/user';

class Register extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        // e.persist();
        var user = serializeForm(e.target, { hash: true });
        this.props.dispatch(register(user));
    }

    render() {
        console.log(this.props)
        return (
            <div className='register-info-box'>
                <form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <Input placeholder="username" name="username" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <Input placeholder="password" name="password" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <Input placeholder="email" name="email" />
                    </InputGroup>
                    <br />
                    <Button color="primary" type="submit" disabled={this.props.loading === "WAITING"}>
                        {this.props.loading !== "WAITING" ? "Register!" : "Loading"}
                        {this.props.loading === "FINISHED" && <Redirect to='/' />}
                    </Button>
                </form>
            </div>
        );
    }
}

export default connect(data => ({ loading: data.loading_states.register }))(Register);
