import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import './List.css';

import { getList, deleteRequest, patchRequest } from '../../redux/actions/request';
import ChangeStatusPopover from './ChangeStatusPopover';

class ListRequest extends Component {
    state = {
        filterStatus: undefined,
    }

    componentDidMount() {
        this.props.dispatch(getList());
    }

    filter = (request) => {
        if (!this.state.filterStatus || this.state.filterStatus === 'AllRequest') {
            return true;
        } else {
            return request.status === this.state.filterStatus;
        }
    }

    formatDate = (date) => {
        date = new Date(Date.parse(date));

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return year + '-' + month + '-' + day;
    }

    deleteRequest = (form) => {
        var cfm = window['confirm']('Are you sure you want to delete this? ');
        if (cfm) {
            this.props.dispatch(deleteRequest(form))
        }
    }

    updateRequest = (form) => {
        this.props.dispatch(patchRequest(form));
    }

    handleFilterChange = (e) => {
        // e.persist();
        this.setState({
            filterStatus: e.target.value,
        });
    }

    status2Color = (s) => {
        switch (s) {
            case 'Approved':
                return "#d7f1dd";
            case 'Denied':
                return "#ffd4ce";
            case 'Pending':
                return "#ffffff";
        }
    }

    render() {
        return (
            <div style={{ padding: "30px" }}>
                <div style={{ padding: "30px", background: "#f3f3f3", width: '620px', marginBottom: "20px" }}>
                    <span>Filter by Status: </span>
                    <select onChange={this.handleFilterChange} value={this.state.value}>
                        <option value="AllRequest">All Requests</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Denied">Denied</option>
                    </select>
                </div>
                <table>
                    <tbody>
                        <tr style={{ borderBottom: "2px solid black" }}>
                            <th style={{ width: '260px' }}>Title</th>
                            <th style={{ width: '100px' }}>Status</th>
                            <th style={{ width: '100px' }}>Created</th>
                            <th style={{ width: '100px' }}>updated</th>
                            <th style={{ width: '60px' }}>Delete</th>
                        </tr>
                        {
                            this.props.requests.filter(this.filter).map(r => (
                                <tr key={r.id} style={{ background: this.status2Color(r.status) }}>
                                    <td>{r.title}</td>
                                    <td>
                                        <ChangeStatusPopover value={r.status} id={r.id} >
                                            <button className="asLink lnk" onClick={() => this.updateRequest({ id: r.id, status: "Approved" })}>
                                                Approved
                                            </button>
                                            <br />
                                            <button className="asLink lnk" onClick={() => this.updateRequest({ id: r.id, status: "Denied" })}>
                                                Denied
                                            </button>
                                        </ChangeStatusPopover>
                                    </td>
                                    <td>{this.formatDate(r.created)}</td>
                                    <td>{this.formatDate(r.updated)}</td>
                                    <td>
                                        <button className="asLink lnk" onClick={() => this.deleteRequest({ id: r.id })}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
        // return (

        // );
    }
}

export default connect(store => ({ requests: store.requests }))(ListRequest);