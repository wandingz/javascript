import React, { Component } from 'react';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { InputGroup, Input } from 'reactstrap';
import { Prompt } from 'react-router'

import { createRequest } from '../../redux/actions/request';
import LoadingButton from '../util/LoadingButton';

class CreateRequest extends Component {

    state = {
        touched: false,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var user = serializeForm(e.target, { hash: true });
        this.props.dispatch(createRequest(user));
        this.setState({
            touched: false,
        });
    }

    handleInput = (e) => {
        this.setState({
            touched: true,
        });
    }

    render() {
        return (
            <div className='register-info-box'>
                <Prompt when={this.state.touched} message="Are you sure you want to leave?" />
                <form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <Input placeholder="Title" name="title" onChange={this.handleInput}/>
                    </InputGroup>
                    <br />
                    <LoadingButton type="submit" finish_to='/listRequest' tag="CreateRequest" value="CreateRequest" />
                </form>
            </div>
        );
    }
}

export default connect()(CreateRequest);