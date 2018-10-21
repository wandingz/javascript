import React, { Component } from 'react';
// This is just a simple example of a component that can be rendered on both
// the server and browser

export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = { items: this.props.items, disabled: true };
    }
    // getInitialState = () => {
    //     return { items: this.props.items, disabled: true }
    // }
    componentDidMount = () => {
        this.setState({ disabled: false })
    }
    handleClick = () => {
        this.setState({
            items: this.state.items.concat('Item ' + this.state.items.length),
        });
    }
    render = () => {
        return <div>
            <button class='zhaoyi' onClick={this.handleClick} disabled={this.state.disabled}>
                'Add Item'
            </button>
            <ul>
                {this.state.items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
        // return div(null,

        //     button({ onClick: this.handleClick, disabled: this.state.disabled }),

        //     ul({
        //         children: this.state.items.map(function (item) {
        //             return li(null, item)
        //         })
        //     })

        // )
    }
}
