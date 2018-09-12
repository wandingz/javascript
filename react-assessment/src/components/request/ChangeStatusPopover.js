import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import PropTypes from 'prop-types';

import './ChangeStatusPopover.css';

class ChangeStatusPopover extends Component {
    state = {
        popoverOpen: false
    };

    toggle = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    handleClick = () => {
        this.setState({
            popoverOpen: false
        });
    }

    render() {
        return (
            <span>
                <button className="asLink lnk mr-1" id={'Popover-' + this.props.id} onClick={this.toggle}>
                    {this.props.value}
                </button>
                <Popover placement="right" isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle}>
                    <div onClick={this.handleClick} className="popover-container">
                        {this.props.children}
                    </div>
                </Popover>
            </span>
        );
    }
}

ChangeStatusPopover.propTypes = {
    value: PropTypes.string.isRequired,
}

export default ChangeStatusPopover;