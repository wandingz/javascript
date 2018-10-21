import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAppsIfNeeded } from '../redux/actions'

import { withRouter } from 'react-router'

import Card from './card'


class App extends Component {

  componentDidMount() {
    console.log(this.props);
    this.props.dispatch(fetchAppsIfNeeded())
  }


  render() {
    const { isFetching, apps } = this.props
    let totalapps = apps.length;

    return (
      <React.Fragment>
        <div className="propsLocation">
          {JSON.stringify(this.props.location)}
          <Link to="/">Home</Link>
          <Link to="/client">Client</Link>
        </div>
        <div>
          {isFetching && apps.length === 0 && <h2>Loading...</h2>}
          {!isFetching && apps.length === 0 && <h2>Empty.</h2>}
          <Card apps={apps} totalapps={totalapps} />
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { isFetching, apps } = state

  return {
    isFetching,
    apps
  }
}

export default withRouter(connect(mapStateToProps)(App))
