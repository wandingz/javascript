import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

import { LOADING_PENDING, LOADING_FINISHED } from '../../redux/actions/loading';

class LoadingButton extends Component {
    render() {
        var { value, loadingValue, tag, finish_to, dispatch, ...otherProps } = this.props;
        tag = tag || 'ButtonTagDefault';
        loadingValue = loadingValue || "Loading"
        var loading = this.props.loading[tag];
        return (
            <button color={this.props.color || "primary"} {...otherProps} disabled={loading === LOADING_PENDING}>
                {loading !== LOADING_PENDING ? value : loadingValue}
                {loading === LOADING_FINISHED && finish_to && <Redirect to={finish_to} />}
            </button>
        );
    }
}

LoadingButton.propTypes = {
    value: PropTypes.string.isRequired,
    loadingValue: PropTypes.string,
    tag: PropTypes.string,
    finish_to: PropTypes.string,
}

export default connect(data => ({ loading: data.loading_states }))(LoadingButton);