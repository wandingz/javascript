import React, { Component } from 'react'; // Fragment
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { InputGroup, Input } from 'reactstrap';

import './Register.css';
import { register } from '../../redux/actions/user';
import LoadingButton from '../util/LoadingButton';

class Register extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        // e.persist();
        var user = serializeForm(e.target, { hash: true });
        this.props.dispatch(register(user));
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
                    <InputGroup>
                        <Input placeholder="email" name="email" />
                    </InputGroup>
                    <br />
                    <LoadingButton type="submit" finish_to='/' tag="Register" value="Register" />
                    {/* <Button color="primary" type="submit" disabled={this.props.loading === LOADING_PENDING}>
                        {this.props.loading !== LOADING_PENDING ? "Register!" : "Loading"}
                        {this.props.loading === LOADING_FINISHED && <Redirect to='/' />}
                    </Button> */}
                </form>
            </div>
        );
    }
}

export default connect()(Register);
