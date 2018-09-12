import React, { Component } from 'react';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { InputGroup, Input } from 'reactstrap';

import { login } from '../../redux/actions/user';
import LoadingButton from '../util/LoadingButton';

class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        var user = serializeForm(e.target, { hash: true });
        this.props.dispatch(login(user));
    }

    render() {
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
                    <LoadingButton type="submit" finish_to='/' tag="Login" value="Login" />
                    {/* <Button color="primary" type="submit" disabled={this.props.loading === LOADING_PENDING}>
                        {this.props.loading !== LOADING_PENDING ? "Login!" : "Loading"}
                        {this.props.loading === LOADING_FINISHED && <Redirect to='/' />}
                    </Button> */}
                </form>
            </div>
        );
    }
}

export default connect()(Login);